import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { DeploymentConfigInput } from 'src/deployment/dto/deployment.input';
import { DeploymentProvider } from 'src/deployment/entities/deployment.entity';

@InputType()
export class CreateServiceInput {
  @Field(() => String)
  name: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => DeploymentProvider)
  deploymentProvider: DeploymentProvider;

  @Field(() => DeploymentConfigInput, { nullable: true })
  config?: DeploymentConfigInput;
}
