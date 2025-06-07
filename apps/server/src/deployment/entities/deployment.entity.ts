import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from 'src/service/entities/service.entity';

@ObjectType()
export class DeploymentConfig {
  @Field(() => String, { nullable: true })
  image?: string;
}

export enum DeploymentProvider {
  GIT = 'git',
  DOCKER = 'docker',
}

export enum DeploymentStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  FINISHED = 'finished',
}

@ObjectType()
@Entity({ name: 'deployment' })
export class Deployment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Column({ name: 'service_id' })
  serviceId: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  triggered_by: string;

  @Field(() => DeploymentProvider)
  @Column()
  provider: DeploymentProvider;

  @Field(() => DeploymentConfig)
  @Column({ type: 'jsonb' })
  config: DeploymentConfig;

  @Field(() => DeploymentStatus)
  @Column()
  status: DeploymentStatus;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  kubernetesName: string;

  @ManyToOne(() => Service, (service) => service.deployments)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

registerEnumType(DeploymentProvider, {
  name: 'DeploymentProvider',
});

registerEnumType(DeploymentStatus, {
  name: 'DeploymentStatus',
});
