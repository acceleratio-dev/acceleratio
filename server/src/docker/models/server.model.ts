import { Field, ID, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  options: {
    customName: 'Server',
  },
  schemaOptions: {
    collection: 'server',
    timestamps: true,
  },
})
@ObjectType()
export class Server {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop()
  ip: string;

  @Field(() => String)
  @prop()
  status: string;

  @Field(() => String)
  @prop()
  nodeId: string;
}
