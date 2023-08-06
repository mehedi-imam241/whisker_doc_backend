import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentSlotInput {
  @Field(() => Number)
  idx: number;
}

@InputType()
export class CreateAllAppointmentSlotsInput {
  @Field(() => [CreateAppointmentSlotInput])
  slots: CreateAppointmentSlotInput[];
}
