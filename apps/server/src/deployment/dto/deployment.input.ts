import { Field, ID, InputType } from '@nestjs/graphql';
import {
  DeploymentProvider,
  DeploymentStatus,
} from '../entities/deployment.entity';

@InputType()
export class DeploymentConfigInput {
  @Field(() => String, { nullable: true })
  image?: string;
}

@InputType()
export class DeploymentInput {
  @Field(() => String)
  name: string;

  @Field(() => ID)
  serviceId: string;

  @Field(() => DeploymentProvider)
  provider: DeploymentProvider;

  @Field(() => DeploymentConfigInput, { nullable: true })
  config?: DeploymentConfigInput;

  @Field(() => DeploymentStatus)
  status: DeploymentStatus;

  @Field(() => String, { nullable: true })
  triggeredBy?: string;
}
