import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'pod' })
export class Pod {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  kubernetesUid: string;

  @Field()
  @Column()
  namespace: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  createdAt: Date;
}
