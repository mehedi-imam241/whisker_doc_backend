import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  text: string;
  senderId: string;
  receiverId: string;
  chatId: string;
}
