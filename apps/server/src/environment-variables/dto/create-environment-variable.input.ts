import { Field, InputType } from '@nestjs/graphql';
import { EnvironmentVariableScope } from '../entities/environment-variables';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateEnvironmentVariableInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  value: string;

  @Field(() => EnvironmentVariableScope)
  @IsEnum(EnvironmentVariableScope)
  scope: EnvironmentVariableScope;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  serviceId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  projectId?: string;
}
