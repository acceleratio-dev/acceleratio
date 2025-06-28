import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Pod } from './pod.object';

export enum PodEventType {
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
}

@ObjectType()
export class PodMessage {
  @Field(() => PodEventType)
  type: PodEventType;

  @Field(() => Pod)
  pod: Pod;
}

registerEnumType(PodEventType, {
  name: 'PodEventType',
});
