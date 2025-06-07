import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @Field()
  @IsOptional()
  @IsString()
  description: string;
}
