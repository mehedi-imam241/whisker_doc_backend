import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MedicineInput } from './prescription.dto';



@InputType()

export class CreatePrescription2 {

    @Field(() => String)
    petId: string;
    
    @Field(() => String)
    appointmentId: string;

    @Field(() => String)
    vetId: string;

  
  @Field(() => [String])
  symptoms: string[];

  @Field(() => [String])
  diseases: string[];

  @Field(() => [MedicineInput])
  medicines: MedicineInput[];
}


