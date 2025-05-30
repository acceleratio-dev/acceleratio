import {
  InputType,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

export enum DomainStatus {
  VERIFYING = 'verifying',
  VERIFIED = 'verified',
}

registerEnumType(DomainStatus, {
  name: 'DomainStatus',
  description: 'The status of a domain',
});

@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class Domain {
  @Field(() => String)
  @prop({ required: true })
  domain!: string;

  @Field(() => String)
  @prop({ required: false })
  path?: string;

  @Field(() => Number)
  @prop({ required: false })
  port?: number;

  @Field(() => DomainStatus)
  @prop({ required: true, enum: DomainStatus, default: DomainStatus.VERIFYING })
  status!: DomainStatus;
}

@InputType()
export class DomainInput {
  @Field(() => String)
  domain!: string;

  @Field(() => String, { nullable: true })
  path?: string;

  @Field(() => Number, { nullable: true })
  port?: number;
}
