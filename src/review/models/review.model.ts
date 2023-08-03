import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<Review>;

@ObjectType()
@Schema()
export class Review {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Field(() => String)
  @Prop()
  review: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
