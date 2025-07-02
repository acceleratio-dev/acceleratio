import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'nodes' })
export class NodeEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  ip: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  status: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  cpu: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  ram: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  storage: string;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
