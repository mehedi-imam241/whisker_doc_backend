import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
@Schema()
export class CreatePrescription {
  @Field(() => String)
  petId: string;

  @Field(() => [String])
  symtoms: string[];

  @Field(() => [String])
  diseases: string[];

  @Field(() => [MedicineInput])
  medicines: MedicineInput[];
}
