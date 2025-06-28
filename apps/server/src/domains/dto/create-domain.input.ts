import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateDomainInput {
  @Field(() => String)
  @IsNotEmpty()
  url: string;
}
