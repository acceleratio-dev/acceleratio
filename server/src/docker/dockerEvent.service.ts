import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import * as Docker from 'dockerode';
import { DeploymentService } from 'src/deployment/deployment.service';
import { ContainerStatus } from 'src/deployment/models/deployment.model';

const EVENT_STATUS_MAP = {
  destroy: ContainerStatus.STOPPED,
  created: ContainerStatus.PENDING,
  start: ContainerStatus.RUNNING,
};

@Injectable()
export class DockerEventService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(DockerEventService.name);
  private readonly sdk: Docker;
  private eventStream: any;
  private isListening = false;

  constructor(private readonly deploymentService: DeploymentService) {
    this.sdk = new Docker();
  }

  async onApplicationBootstrap() {
    this.logger.log('Initializing Docker event listener...');

    setImmediate(() => this.startDockerEventListener());

    this.logger.log('Docker event service initialized (non-blocking)');
  }

  async onApplicationShutdown() {
    console.log('Shutting down Docker event listener...');
    this.isListening = false;

    if (this.eventStream) {
      this.eventStream.destroy();
    }
  }

  private async startDockerEventListener() {
    if (this.isListening) return;

    try {
      this.logger.log('Starting Docker event stream...');

      this.eventStream = await this.sdk.getEvents({
        since: Math.floor(Date.now() / 1000),
        filters: {
          type: ['container', 'image', 'network', 'volume'],
        },
      });

      this.isListening = true;
      this.logger.log(
        'Docker event listener is now active (running in background)',
      );

      this.eventStream.on('data', (chunk) => {
        setImmediate(() => this.processEventChunk(chunk));
      });

      this.eventStream.on('error', (error) => {
        this.logger.error('Docker event stream error:', error);
        this.isListening = false;

        setTimeout(() => {
          if (!this.isListening) {
            this.startDockerEventListener();
          }
        }, 5000);
      });

      this.eventStream.on('end', () => {
        this.logger.warn('Docker event stream ended unexpectedly');
        this.isListening = false;
      });
    } catch (error) {
      this.logger.error('Failed to start Docker event listener:', error);
      this.isListening = false;

      setTimeout(() => this.startDockerEventListener(), 10000);
    }
  }

  private processEventChunk(chunk: Buffer) {
    try {
      const events = chunk.toString().split('\n').filter(Boolean);

      events.forEach((eventData) => {
        try {
          const event = JSON.parse(eventData);

          const serviceId = event.Actor.Attributes['com.acceleratio.serviceId'];
          const deploymentId =
            event.Actor.Attributes['com.acceleratio.deploymentId'];
          const status = event.status;

          if (serviceId && deploymentId && EVENT_STATUS_MAP[status]) {
            this.logger.log(
              `Service ${serviceId} status updated to ${EVENT_STATUS_MAP[status]}`,
            );
            this.deploymentService.updateDeploymentContainerStatus(
              deploymentId,
              EVENT_STATUS_MAP[status],
            );
          }
        } catch (parseError) {
          this.logger.error('Failed to parse Docker event:', parseError);
        }
      });
    } catch (error) {
      this.logger.error('Error processing event chunk:', error);
    }
  }
}
