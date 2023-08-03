import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@InputType()
export class CreateAppointmentInput {
  @Field(() => Date)
  date: Date;

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;

  @Field(() => AppointmentType)
  type: AppointmentType;

  @Field(() => String)
  petId: string;

  @Field(() => String)
  vetId: string;
}

enum AppointmentType {
  ONLINE = 'ONLINE',
  INPERSON = 'INPERSON',
}

registerEnumType(AppointmentType, {
  name: 'AppointmentType',
});
