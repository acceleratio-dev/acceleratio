import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDomainsObject {
  @Field(() => String)
  path: string;

  @Field(() => String)
  domain: string;

  @Field(() => Number)
  port: number;
}
