import { Field, ID, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  options: {
    customName: 'Project',
  },
  schemaOptions: {
    collection: 'project',
    timestamps: true,
  },
})
@ObjectType()
export class Project {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop()
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
