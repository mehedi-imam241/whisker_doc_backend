import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type ReviewVetDocument = HydratedDocument<ReviewVet>;

@ObjectType()
@Schema()
export class ReviewVet {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Field(() => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  vetId: string;

  @Field(() => String)
  @Prop()
  review: string;
}

export const ReviewVetSchema = SchemaFactory.createForClass(ReviewVet);
