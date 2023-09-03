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
export class VetLocation {
  @Field(() => Number)
  lat: number;

  @Field(() => Number)
  lng: number;
}

@ObjectType()
@Entity()
export class VetInfo {
  constructor(fields?: Partial<VetInfo>) {
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

  @Field(() => VetLocation)
  @Column({ type: 'jsonb' })
  location: VetLocation;

  @Field(() => String)
  @Column({ unique: true })
  certificateId: string;

  // @Field(() => String, { nullable: true })
  // @Column()
  // certificateLink: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  degree: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  zoomLink: string;

  @Field(() => Number, { nullable: true })
  distance: number;

  @Field(() => Number, { nullable: true })
  duration: number;

  @Field(() => Number)
  @Column({ type: 'int', default: 0 })
  sumRating: number;

  @Field(() => Number)
  @Column({ type: 'int', default: 0 })
  ratingCount: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  apptCount: number;
}
