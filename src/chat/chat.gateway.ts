import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(parseInt(process.env.SOCKET_PORT), { cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: any) {
    try {
      const username = client.handshake.auth.userName;
      console.log(client['handshake'], 'Here');
      if (!username) {
        throw new Error('Invalid username');
      }
      console.log('my life', username);
      client.data.username = username;
      console.log('Client connected:', client.id);
    } catch (error) {
      console.log(error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    console.log('message', payload);
    let senderID: string = '60b9b0b9e0b9c2b4b4a0b9b9';
    let receiverID: string = '60b9b0b9e0b9c2b4b4a0b9b9';
    this.chatService
      .create({
        text: payload,
        senderId: senderID,
        receiverId: receiverID,
        chatId: '60b9b0b9e0b9c2b4b4a0b9b9',
      })
      .then((r) => this.server.emit('message', r));
  }
}
