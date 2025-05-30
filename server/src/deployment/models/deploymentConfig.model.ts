import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class DeploymentConfig {
  @Field(() => Number, { nullable: true })
  @prop()
  cpuLimit?: number;

  @Field(() => Number, { nullable: true })
  @prop()
  memoryLimit?: number;

  @Field(() => String)
  @prop({ required: true })
  image: string;
}

@InputType()
export class DeploymentConfigInput extends DeploymentConfig {
  @Field(() => Number, { nullable: true })
  override cpuLimit?: number;

  @Field(() => Number, { nullable: true })
  override memoryLimit?: number;

  @Field(() => String)
  override image: string;
}

@InputType()
export class DeploymentConfigUpdateInput {
  @Field(() => Number, { nullable: true })
  cpuLimit?: number;

  @Field(() => Number, { nullable: true })
  memoryLimit?: number;

  @Field(() => String, { nullable: true })
  image?: string;
}
