import { Field, InputType } from '@nestjs/graphql';
import { ServiceDeploymentProvider } from '../entities/service-deployment.entity';

@InputType()
export class UpdateServiceDeploymentInput {
  @Field(() => String)
  serviceId: string;

  @Field(() => String, { nullable: true })
  internalName?: string;

  @Field(() => ServiceDeploymentProvider, { nullable: true })
  provider?: ServiceDeploymentProvider;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Number, { nullable: true })
  replicas?: number;
}
