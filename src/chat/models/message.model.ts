import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MessageDocument = Message & mongoose.Document;

@Schema()
export class Message {
  @Prop({ required: true, minlength: 1, maxlength: 1000 })
  text: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  senderId: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  receiverId: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  chatId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
