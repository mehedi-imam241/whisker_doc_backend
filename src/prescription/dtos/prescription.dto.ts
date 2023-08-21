import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MedicineInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  dose: string;
  @Field(() => Number)
  duration: number;
}

@InputType()
export class CreatePrescription {

  @Field(() => String)
  petId: string;

  @Field(() => String)
  appointmentId: string;

  @Field(() => [String])
  symptoms: string[];

  @Field(() => [String])
  diseases: string[];

  @Field(() => [MedicineInput])
  medicines: MedicineInput[];

  @Field(() => String)
  advice: string;


}
