import { InputType, Field } from '@nestjs/graphql';
import { DeploymentConfigInput } from '../models/deploymentConfig.model';

@InputType()
export class CreateDeploymentInput {
  @Field(() => String)
  serviceId: string;

  @Field(() => DeploymentConfigInput)
  config: DeploymentConfigInput;
}
