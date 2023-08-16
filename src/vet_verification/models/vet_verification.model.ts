import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';

@ObjectType()
@Entity()
export class VetVerification {
  constructor(fields?: Partial<VetVerification>) {
    if (fields) {
      Object.assign(this, fields);
    }
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
  vet: User;

  @Field(() => String)
  @Column({ unique: true })
  certificateId: string;

  // @Field(() => String, { nullable: true })
  // @Column()
  // certificateLink: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  degree: string;
}
