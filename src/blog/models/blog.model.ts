import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';

@ObjectType()
@Entity()
export class Blog {
  constructor(fields?: Partial<Blog>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Field(() => String)
  @Column()
  body: string;

  @Column({ type: 'varchar' })
  authorId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;
}
