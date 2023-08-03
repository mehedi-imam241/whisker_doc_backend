import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type SymptomsDocument = HydratedDocument<Symptoms>;

@ObjectType()
@Schema()
export class Symptoms {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop()
  species: string;

  @Field(() => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  vetId: string;

  @Field({ nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  verifiedBy?: string;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  article: string;
}

export const SymptomsSchema = SchemaFactory.createForClass(Symptoms);
SymptomsSchema.index({ title: 'text', article: 'text' });
