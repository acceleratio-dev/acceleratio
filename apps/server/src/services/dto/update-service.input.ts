import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceInput {
  @Field(() => String)
  name: string;

  @Field()
  serviceId: string;
}
