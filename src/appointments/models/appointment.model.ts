import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Pet } from '../../pets/models/pet.model';
import { User } from '../../user/models/user.model';
import { Prescription } from 'src/prescription/models/prescription.model';
import { Review } from 'src/review/models/review.model';

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

  // @Field(() => Boolean)
  // @Column({ default: false, type: Boolean })
  // approved: boolean;

  @Field(() => String)
  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Field(() => Date)
  @Column({ type: Date })
  date: Date;

  @Field(() => Number)
  @Column({ type: 'int' })
  slot_id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  petId: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  ownerId: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  vetId: string;

  @Field(() => String, { nullable: true })
  zoomLink: string;

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

  // @Field(()=> String,{nullable:true})
  // @Column('varchar')
  // prescriptionId: string;

  @Field(() => Prescription, { nullable: true })
  prescription: Prescription;

  @Field(() => Review, { nullable: true })
  review: Review;
}
