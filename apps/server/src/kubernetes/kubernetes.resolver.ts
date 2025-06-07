import { Resolver } from '@nestjs/graphql';
import { KubernetesService } from './kubernetes.service';

@Resolver()
export class KubernetesResolver {
  constructor(private readonly kubernetesService: KubernetesService) {}
}
