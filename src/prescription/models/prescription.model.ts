import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/models/appointment.model';
import { Pet } from 'src/pets/models/pet.model';
import { User } from 'src/user/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@ObjectType()
export class Medicine {
  @Field(() => String)
  name: string;
  @Field(() => String)
  dose: string;
  @Field(() => Number)
  duration: number;
}

@ObjectType()
@Entity()
export class Prescription {
  constructor(fields?: Partial<Prescription>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => Number)
  @PrimaryGeneratedColumn('increment')
  _id: number;

  // @Field(() => Date)
  // @CreateDateColumn()
  // createdAt: Date;

  @Field(() => String)
  @Column({ type: 'varchar' })
  petId: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  appointmentId: string;

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment)
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  @Field(() => Pet, { nullable: true })
  @ManyToOne(() => Pet)
  @JoinColumn({ name: 'petId' })
  pet: Pet;

  @Field(() => String)
  @Column({ type: 'varchar' })
  vetId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'vetId' })
  vet: User;

  @Field(() => [String])
  @Column('text', { array: true })
  symptoms: string[];

  @Field(() => [String])
  @Column('text', { array: true })
  diseases: string[];

  @Field(() => [Medicine])
  @Column('jsonb')
  medicines: Medicine[];

  @Field(() => String)
  @Column({ type: 'varchar' })
  advice: string;
}
