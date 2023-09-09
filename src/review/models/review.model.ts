import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';
import { Appointment } from 'src/appointments/models/appointment.model';

@ObjectType()
@Entity()
export class Review {
  constructor(fields?: Partial<Review>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => Number)
  @PrimaryGeneratedColumn('uuid')
  _id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  vetId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'vetId' })
  vet: User;

  @Field(() => String)
  @Column({ type: 'varchar' })
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => String)
  @Column({ type: 'varchar' })
  appointmentId: string;

  @Field(() => String)
  @OneToOne(() => Appointment)
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  @Field(() => String)
  @Column({ type: 'varchar' })
  comment: string;

  @Field(() => Number)
  @Column({ type: 'int' })
  rating: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
