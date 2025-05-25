import { Field, ID, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  options: {
    customName: 'User',
  },
  schemaOptions: {
    collection: 'user',
    timestamps: true,
  },
})
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  username: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;
}
