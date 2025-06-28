import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum ServiceDeploymentProvider {
  DOCKER = 'docker',
  GITHUB = 'github',
}

export enum ServiceDeploymentStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
  FINISHED = 'finished',
}

@ObjectType()
@Entity({ name: 'service_deployments' })
export class ServiceDeployment {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  serviceId: string;

  @Field(() => ServiceDeploymentProvider)
  @Column()
  provider: ServiceDeploymentProvider;

  @Field(() => String)
  @Column()
  image: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  internalName?: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  replicas: number;

  @Field(() => ServiceDeploymentStatus)
  @Column()
  status: ServiceDeploymentStatus;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(ServiceDeploymentProvider, {
  name: 'ServiceDeploymentProvider',
});

registerEnumType(ServiceDeploymentStatus, {
  name: 'ServiceDeploymentStatus',
});
