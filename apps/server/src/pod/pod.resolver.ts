import { Query, Resolver } from '@nestjs/graphql';
import { PodService } from './pod.service';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { Pod } from './entities/pod.entity';

@Resolver()
export class PodResolver {
  constructor(
    private readonly podService: PodService,
    private readonly kubernetesService: KubernetesService,
  ) {}

  @Query(() => [Pod])
  async pods() {
    const k8sPods = await this.kubernetesService.getAllPods();
    return k8sPods.map((pod) => ({
      name: pod.metadata?.name || '',
      namespace: pod.metadata?.namespace || '',
      status: pod.status?.phase || '',
      image: pod.spec?.containers[0].image || '',
      createdAt: pod.metadata?.creationTimestamp || '',
    }));
  }
}
