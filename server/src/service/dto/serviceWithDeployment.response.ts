import { Field, ObjectType } from '@nestjs/graphql';
import { Deployment } from 'src/deployment/models/deployment.model';
import { Service } from '../models/service.model';

@ObjectType()
export class ServiceWithDeployment extends Service {
  @Field(() => Deployment, { nullable: true })
  activeDeployment: Deployment;

  @Field(() => Deployment, { nullable: true })
  draftDeployment: Deployment;
}
