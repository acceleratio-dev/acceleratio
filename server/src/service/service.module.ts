import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Service } from './models/service.model';
import { DeploymentModule } from 'src/deployment/deployment.module';

@Module({
  imports: [TypegooseModule.forFeature([Service]), DeploymentModule],
  providers: [
    ServiceResolver,
    ServiceService,
    // {
    //   provide: 'PUB_SUB',
    //   useValue: pubSub,
    // },
  ],
  exports: [ServiceService],
})
export class ServiceModule {}
