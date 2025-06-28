import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnvironmentVariable } from 'src/environment-variables/entities/environment-variables';

@ObjectType()
@Entity({ name: 'services' })
export class Service {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Field(() => String)
  @Column()
  @Field(() => String)
  projectId: string;

  @ManyToOne(() => Project, (project) => project.services)
  project: Project;

  @OneToMany(() => EnvironmentVariable, (environmentVariable) => environmentVariable.serviceId)
  environmentVariables: EnvironmentVariable[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
