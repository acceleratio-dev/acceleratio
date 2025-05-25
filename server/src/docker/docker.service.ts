import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';
import { Server } from './models/server.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { networkInterfaces } from 'os';

@Injectable()
export class DockerService {
  private readonly sdk: Docker;

  constructor(
    @InjectModel(Server)
    private readonly serverModel: ReturnModelType<typeof Server>,
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
        AdvertiseAddr: `${ip}:${port}`,
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

  async getNodes() {
    const nodes = await this.serverModel.find();
    return nodes;
  }
}
