import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum DomainStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
}

@ObjectType()
@Entity({ name: 'domains' })
export class Domain {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  url: string;

  @Field(() => DomainStatus)
  @Column({ default: DomainStatus.PENDING })
  status: DomainStatus;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(DomainStatus, {
  name: 'DomainStatus',
});
