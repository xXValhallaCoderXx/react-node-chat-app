import Repository from './repository';
import Logger from 'chat-server/loaders/logger-config';
import { Result } from 'chat-server/shared/classes';
import { default as MessageEntity } from './entity';
import Message from './model';
import { Message as MessageType } from './interface';

export default class MessageServices {
  private repo = new Repository(Message);

  public async createMessage(message: string, room: any, user: any): Promise<Result<MessageType>> {
    const validMsgOrError = await MessageEntity.create(room, message, user);

    if (validMsgOrError.isFailure) {
      return Result.fail(validMsgOrError.error);
    }

    const newMessageOrError = await this.repo.create(validMsgOrError.getValue());
    if (newMessageOrError.isFailure) {
      Logger.error('Message Services - Create Message: ', newMessageOrError.error);
      return Result.fail('Error creating Message');
    }

    return Result.ok(newMessageOrError.getValue());
  }

  public async fetchRoomMessages(roomUid: any): Promise<Result<MessageType>> {
    const roomMessages = await this.repo.fetchMessagesAndAuthor(roomUid);
    return Result.ok(roomMessages);
  }
}
