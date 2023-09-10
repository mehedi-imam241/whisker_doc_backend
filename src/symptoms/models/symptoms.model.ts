import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Symptoms {
  constructor(fields?: Partial<Symptoms>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  tags: string[];

  @Field(() => Number)
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 100 })
  species: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  vetId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'vetId' })
  vet: User;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  verifiedById?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'verifiedById' })
  verifiedBy: User;

  @Field(() => String)
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  article: string;
}
