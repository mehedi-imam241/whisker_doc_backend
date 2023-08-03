import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HomeService } from './home_service.model';
import { Slots } from './slots.model';

@ObjectType()
@Entity()
export class Date_schedule {
  constructor(fields?: Partial<Date_schedule>) {
    if (fields) Object.assign(this, fields);
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => Date)
  @Column({ type: 'date' })
  date: Date;

  @Field(() => String)
  @Column({ type: 'varchar' })
  homeServiceId: string;

  @Field(() => HomeService, { nullable: true })
  @ManyToOne(() => HomeService)
  @JoinColumn({ name: 'homeServiceId' })
  homeService?: HomeService;

  @Field(() => [Slots], { nullable: true })
  @OneToMany(() => Slots, (slots) => slots.dateSchedule)
  slots?: Slots[];
}
