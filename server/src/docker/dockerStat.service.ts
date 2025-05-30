import { Logger, OnApplicationShutdown } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import * as Docker from 'dockerode';

@Injectable()
export class DockerStatService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(DockerStatService.name);
  private readonly sdk: Docker;

  constructor() {
    this.sdk = new Docker({
      socketPath: '/var/run/docker.sock',
    });
  }

  async onApplicationBootstrap() {
    this.logger.log('Initializing Docker stat listener...');
    // const containers = await this.sdk.listContainers();
    // const stats = await Promise.all(
    //   containers.map((container) =>
    //     this.sdk.getContainer(container.Id).stats({
    //       stream: false,
    //       'one-shot': true,
    //     }),
    //   ),
    // );
    // console.log(stats[0].cpu_stats.cpu_usage.total_usage);
  }

  async onApplicationShutdown() {
    this.logger.log('Shutting down Docker stat listener...');
  }
}
