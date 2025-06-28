import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pod {
  @Field(() => String)
  name: string;

  @Field(() => String)
  node: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  startTime: string;
}
