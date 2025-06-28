import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AssignDomainInput {
  @Field(() => String)
  @IsNotEmpty()
  domainId: string;

  @Field(() => String)
  @IsNotEmpty()
  serviceId: string;

  @Field(() => String)
  path: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  stripPath: boolean;
}
