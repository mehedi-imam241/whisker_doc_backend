import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class BookAppointmentInput {
  @Field(() => Date)
  date: Date;

  @Field(() => Number)
  slot_id: number;

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
