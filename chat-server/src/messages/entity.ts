import { Result } from 'chat-server/shared/classes';
import { Message as MessageType } from './interface';

export default class Message implements MessageType {
  public roomID: string;
  public message: string;
  public author: any;

  private constructor(room: any, message: string, author: any) {
    this.roomID = room;
    this.message = message;
    this.author = author;
  }

  public static async create(room: string, message: string, author: any): Promise<Result<Message>> {
    if (!room) {
      return Result.fail<Message>('Room is missing');
    }

    if (!message) {
      return Result.fail<Message>('Message is missing');
    }

    if (!author) {
      return Result.fail<Message>('Author is missing');
    }

    return Result.ok<Message>(new Message(room, message, author));
  }
}
