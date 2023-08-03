import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Date_schedule } from './date_schedule.model';

@ObjectType()
@Entity()
export class Slots {
  constructor(fields?: Partial<Slots>) {
    if (fields) Object.assign(this, fields);
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  starts_at: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  ends_at: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  occupiedByUser?: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  dateScheduleId: string;

  @Field(() => Date_schedule, { nullable: true })
  @ManyToOne(() => Date_schedule)
  @JoinColumn({ name: 'dateScheduleId' })
  dateSchedule?: Date_schedule;
}
