import { Field, InputType } from '@nestjs/graphql';
import { DomainInput } from '../models/domain.model';

@InputType()
export class AssignDomainInput {
  @Field(() => String)
  serviceId: string;

  @Field(() => DomainInput)
  domain: DomainInput;
}
