import { Field, ObjectType } from '@nestjs/graphql';
import { Service } from '../entities/service.entity';
import { Deployment } from 'src/deployment/entities/deployment.entity';

@ObjectType()
export class ServiceWithDeployments extends Service {
  @Field(() => Deployment, { nullable: true })
  activeDeployment?: Deployment;

  @Field(() => Deployment, { nullable: true })
  draftDeployment?: Deployment;
}
