import { Field, InputType } from '@nestjs/graphql';
import { ServiceType } from '../models/service.model';
import { DeploymentConfigInput } from 'src/deployment/models/deploymentConfig.model';

@InputType()
export class CreateServiceInput {
  @Field(() => String)
  name: string;

  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => DeploymentConfigInput)
  config: DeploymentConfigInput;

  @Field(() => String)
  projectId: string;
}
