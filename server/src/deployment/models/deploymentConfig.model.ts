import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';
import { Domain } from './domain.model';

@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class DeploymentConfig {
  @Field(() => Float, { nullable: true })
  @prop()
  cpuLimit?: number;

  @Field(() => Float, { nullable: true })
  @prop()
  memoryLimit?: number;

  @Field(() => String)
  @prop({ required: true })
  image: string;

  @Field(() => [Domain], { nullable: true })
  @prop({ required: false, default: [] })
  domains?: Domain[];
}

@InputType()
export class DeploymentConfigInput extends DeploymentConfig {
  @Field(() => Float, { nullable: true })
  override cpuLimit?: number;

  @Field(() => Float, { nullable: true })
  override memoryLimit?: number;

  @Field(() => String)
  override image: string;
}

@InputType()
export class DeploymentConfigUpdateInput {
  @Field(() => Float, { nullable: true })
  cpuLimit?: number;

  @Field(() => Float, { nullable: true })
  memoryLimit?: number;

  @Field(() => String, { nullable: true })
  image?: string;
}
