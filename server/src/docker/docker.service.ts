import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as Docker from 'dockerode';
import { Server } from './models/server.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { networkInterfaces } from 'os';
import { CreateDockerServiceInput } from './dto/createDockerService.input';
import { DeploymentDomainService } from 'src/deployment/deployment-domain.service';

// TODO: move servers to separate module and use this service only for dockerode operations
@Injectable()
export class DockerService {
  private readonly sdk: Docker;

  constructor(
    @InjectModel(Server)
    private readonly serverModel: ReturnModelType<typeof Server>,
    @Inject(forwardRef(() => DeploymentDomainService))
    private readonly deploymentDomainService: DeploymentDomainService,
  ) {
    this.sdk = new Docker();
  }

  async isSwarmInitialized() {
    try {
      await this.sdk.swarmInspect();
      return true;
    } catch (error) {
      return false;
    }
  }
  private getPrimaryIP() {
    const interfaces = networkInterfaces();
    return interfaces?.eth0?.[0]?.address || '127.0.0.1';
  }

  async initSwarm(): Promise<string | null> {
    try {
      const isSwarmExists = await this.isSwarmInitialized();

      if (isSwarmExists) {
        throw new Error('Swarm already exists');
      }

      const nets = networkInterfaces();
      const net = Object.values(nets)
        .flat()
        .find((net) => net?.family === 'IPv4' && !net.internal);

      if (!net) {
        throw new Error('No suitable network interface found');
      }

      const ip = this.getPrimaryIP();
      const port = 2377;

      const nodeId = await this.sdk.swarmInit({
        ForceNewCluster: false,
        ListenAddr: `0.0.0.0:${port}`,
        AdvertiseAddr: `${process.env.IP || ip}:${port}`,
      });

      const node = await this.sdk.getNode(nodeId).inspect();

      if (!node) {
        return null;
      }

      await this.serverModel.create({
        name: 'Root Server',
        ip: node.Status.Addr,
        status: node.Status.State,
        nodeId: nodeId,
      });

      return nodeId;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async inspectService(containerId: string) {
    const service = await this.sdk.getService(containerId);
    const inspect = await service.inspect();
    const tasks = await this.sdk.listTasks({
      filters: {
        service: [inspect.Spec.Name],
      },
    });

    for (const task of tasks) {
      const container = await this.sdk.getContainer(
        task.Status.ContainerStatus.ContainerID,
      );
      const inspect = await container.stats();
      console.log(inspect);
    }
    return service.inspect();
  }

  async getNodes() {
    const nodes = await this.serverModel.find();
    return nodes;
  }

  async createService(input: CreateDockerServiceInput) {
    const service = await this.sdk.createService({
      TaskTemplate: {
        ContainerSpec: {
          Image: input.config.image,
          Labels: {
            'com.acceleratio.deploymentId': input.deploymentId,
            'com.acceleratio.serviceId': input.serviceId,
            ...(input.config.domains
              ? await this.deploymentDomainService.generateLabels(
                  input.config.domains,
                )
              : {}),
          },
        },
        Resources: {
          Limits: {
            NanoCPUs: input.config.cpuLimit * 1000000000,
            MemoryBytes: input.config.memoryLimit * 1024 * 1024,
          },
        },
      },
    });
    return (await service).id;
  }

  async deleteService(containerId: string) {
    const service = await this.sdk.getService(containerId);
    await service.remove();
    return true;
  }
}
