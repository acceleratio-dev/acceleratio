import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'service',
    timestamps: true,
  },
})
@ObjectType()
export class Service {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => ServiceType)
  @prop({ required: true })
  type: ServiceType;

  @Field(() => String)
  @prop({ required: true })
  projectId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export enum ServiceType {
  DOCKER = 'docker',
}

registerEnumType(ServiceType, {
  name: 'ServiceType',
  description: 'The type of a service',
});
