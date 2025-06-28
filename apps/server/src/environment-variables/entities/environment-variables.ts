import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EnvironmentVariableScope {
  SERVICE = 'service',
  PROJECT = 'project',
}

@ObjectType()
@Entity({
  name: 'environment_variables',
})
export class EnvironmentVariable {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => EnvironmentVariableScope)
  @Column()
  scope: EnvironmentVariableScope;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  serviceId?: string;

  @ManyToOne(() => Service, (service) => service.environmentVariables, { nullable: true })
  service?: Service;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  projectId?: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  value: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(EnvironmentVariableScope, {
  name: 'EnvironmentVariableScope',
});
