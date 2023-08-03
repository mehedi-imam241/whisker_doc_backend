import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Field(() => String)
  @Prop({ required: true })
  stripeId: string;

  @Field(() => String)
  @Prop()
  stripeSubscriptionId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
