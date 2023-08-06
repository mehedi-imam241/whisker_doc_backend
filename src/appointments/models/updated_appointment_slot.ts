import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';
import { CreateAllAppointmentSlots } from './appointment_slot.model';

@ObjectType()
@Entity()
export class Updated_Appointment_Slot {
  constructor(fields?: Partial<Updated_Appointment_Slot>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => Date)
  @Column({ type: Date })
  date: Date;

  @Field(() => CreateAllAppointmentSlots, { nullable: true })
  @Column({
    default: { slots: [] },
    type: 'json',
    nullable: true,
    transformer: {
      to(value: CreateAllAppointmentSlots): string {
        return JSON.stringify(value);
      },
      from(value: string): CreateAllAppointmentSlots {
        return JSON.parse(value);
      },
    },
  })
  slots?: CreateAllAppointmentSlots;

  @Field(() => String)
  @Column({ type: 'varchar' })
  vetId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'vetId' })
  vet: User;
}
