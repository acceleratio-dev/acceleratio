import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsResolver } from './domains.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([Domain]), KubernetesModule, ServicesModule],
  providers: [DomainsResolver, DomainsService],
})
export class DomainsModule {}
