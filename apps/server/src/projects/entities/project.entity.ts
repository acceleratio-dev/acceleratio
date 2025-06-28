import { Field, ObjectType } from '@nestjs/graphql';
import { Service } from 'src/services/entities/service.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  kubernetesNamespace?: string | null;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => Service, (service) => service.projectId)
  services: Service[];
}
