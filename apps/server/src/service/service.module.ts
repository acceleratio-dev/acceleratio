import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeploymentModule } from 'src/deployment/deployment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), DeploymentModule],
  providers: [ServiceResolver, ServiceService],
})
export class ServiceModule {}
