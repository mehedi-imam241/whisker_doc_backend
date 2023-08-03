import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from '../../pets/models/pet.model';
import { User } from '../../user/models/user.model';

@ObjectType()
@Entity()
export class Appointment {
  constructor(fields?: Partial<Appointment>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => Boolean)
  @Column({ default: false, type: Boolean })
  approved: boolean;

  @Field(() => String)
  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Field(() => Date)
  @Column({ type: Date })
  date: Date;

  @Field(() => String)
  @Column({ type: 'varchar', length: 10 })
  startTime: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 10 })
  endTime: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  petId: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  ownerId: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  vetId: string;

  @Field(() => Pet, { nullable: true })
  @ManyToOne(() => Pet, (pet) => pet.appointments)
  @JoinColumn({ name: 'petId' })
  pet: Pet;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'vetId' })
  vet: User;
}
