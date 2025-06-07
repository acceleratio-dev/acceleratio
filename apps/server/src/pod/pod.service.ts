import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pod } from './entities/pod.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';

@Injectable()
export class PodService {
  private readonly logger = new Logger(PodService.name);

  constructor(
    @InjectRepository(Pod)
    private podRepository: Repository<Pod>,
    private kubernetesService: KubernetesService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const k8sPods = await this.kubernetesService.getAllPods();
    const pods = k8sPods.map((pod) => ({
      kubernetesUid: pod.metadata?.uid || '',
      namespace: pod.metadata?.namespace || '',
      image: pod.spec?.containers[0].image || '',
      name: pod.metadata?.name || '',
      status: pod.status?.phase || '',
      createdAt: new Date(pod.metadata?.creationTimestamp || ''),
    }));

    // await this.podRepository.upsert(pods, {
    //   conflictPaths: ['kubernetesUid'],
    // });

    this.logger.debug('Pods updated');
  }
}
