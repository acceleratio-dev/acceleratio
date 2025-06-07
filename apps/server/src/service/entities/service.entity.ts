import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deployment } from 'src/deployment/entities/deployment.entity';

@ObjectType()
@Entity({ name: 'service' })
export class Service {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Column({ name: 'project_id' })
  projectId: string;

  @Field()
  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Deployment, (deployment) => deployment.service)
  deployments: Deployment[];
}
