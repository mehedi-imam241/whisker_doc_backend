import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';

@ObjectType()
@Entity()
export class UserInfo {
  constructor(fields?: Partial<UserInfo>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  stripeId: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  userId: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  vet: User;
}
