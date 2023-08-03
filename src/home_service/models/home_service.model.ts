import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';
import { Date_schedule } from './date_schedule.model';

@ObjectType()
@Entity()
export class HomeService {
  constructor(fields?: Partial<HomeService>) {
    if (fields) Object.assign(this, fields);
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  vetId: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn({ name: 'vetId' })
  vet?: User;

  @Field(() => [Date_schedule], { nullable: true })
  @OneToMany(() => Date_schedule, (date_schedule) => date_schedule.homeService)
  date_schedule?: Date_schedule[];
}
