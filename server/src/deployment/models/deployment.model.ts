import { ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';
import { DeploymentConfig } from './deploymentConfig.model';

export enum DeploymentStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  FINISHED = 'finished',
}

export enum ContainerStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  STOPPED = 'stopped',
}

@modelOptions({
  schemaOptions: {
    collection: 'deployment',
    timestamps: true,
  },
})
@ObjectType()
export class Deployment {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  serviceId: string;

  @Field(() => DeploymentStatus)
  @prop({ required: true, default: DeploymentStatus.DRAFT })
  status: DeploymentStatus;

  @Field(() => DeploymentConfig)
  @prop({ required: true })
  config: DeploymentConfig;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  containerId: string;

  @Field(() => ContainerStatus, { nullable: true })
  @prop({ required: false })
  containerStatus: ContainerStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(ContainerStatus, {
  name: 'ContainerStatus',
  description: 'The status of a container',
});

registerEnumType(DeploymentStatus, {
  name: 'DeploymentStatus',
  description: 'The status of a deployment',
});
