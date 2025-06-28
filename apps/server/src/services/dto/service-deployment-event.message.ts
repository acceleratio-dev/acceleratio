import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ServiceDeployment } from '../entities/service-deployment.entity';

export enum ServiceDeploymentEventType {
  DEPLOYMENT_CREATED = 'deployment_created',
  DEPLOYMENT_UPDATED = 'deployment_updated',
  DEPLOYMENT_DEPLOYED = 'deployment_deployed',
}

@ObjectType()
export class ServiceDeploymentEventMessage {
  @Field(() => ServiceDeploymentEventType)
  event_type: ServiceDeploymentEventType;

  @Field(() => ServiceDeployment)
  deployment: ServiceDeployment;
}

registerEnumType(ServiceDeploymentEventType, {
  name: 'ServiceDeploymentEventType',
});
