import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';
import { Appointment } from '../../appointments/models/appointment.model';

@ObjectType()
@Entity()
export class Pet {
  constructor(fields?: Partial<Pet>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => String)
  @Column({
    type: 'varchar',
  })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar?: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  species: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  breed: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  gender: string;

  @Field(() => Number)
  @Column({ type: 'int' })
  age: number;

  @Field(() => Number)
  @Column({ type: 'float' })
  weight: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.pet)
  @JoinColumn()
  appointments: Appointment[];
}
