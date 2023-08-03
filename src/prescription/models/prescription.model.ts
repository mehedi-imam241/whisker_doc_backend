import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type PrescriptionDocument = HydratedDocument<Prescription>;

@ObjectType()
export class Medicine {
  @Field(() => String)
  name: string;
  @Field(() => String)
  dose: string;
  @Field(() => Number)
  duration: number;
}

@ObjectType()
@Schema({ timestamps: true })
export class Prescription {
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' })
  petId: string;

  @Field(() => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  vetId: string;

  @Field(() => [String])
  @Prop()
  symtoms: string[];

  @Field(() => [String])
  @Prop()
  diseases: string[];

  @Field(() => [Medicine])
  @Prop()
  medicines: Medicine[];
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
