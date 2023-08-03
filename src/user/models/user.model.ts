import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../../appointments/models/appointment.model';

@ObjectType()
@Entity()
export class User {
  constructor(fields?: Partial<User>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 10 })
  role: string;
}
