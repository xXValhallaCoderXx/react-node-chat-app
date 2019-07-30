import { BaseController, Result } from 'chat-server/shared/classes';
import { MessageServices, MessageType } from 'chat-server/src/messages';
import Logger from 'chat-server/loaders/logger-config';
import Repository from './repository';
import Room from './model';

export default class RoomInfo extends BaseController {
  private repo = new Repository(Room);
  private messageServices = new MessageServices();
  protected async executeImpl(): Promise<any> {
    const { uid } = this.req.params;
    const result: any = await this.repo.fetchRoomInfo(uid);
    const messagesOrError: any = await this.messageServices.fetchRoomMessages(result);
    if (messagesOrError.isFailure) {
      Logger.error('Controller - Room Info: ', messagesOrError.error);
      return this.fail('Error getting messages');
    }
    const messages: any = messagesOrError.getValue().map(item => {
      return {
        message: item.message,
        createdAt: item.createdAt,
        author: item.author.username,
      };
    });

    const response = {
      uid: result.uid,
      name: result.name,
      members: result.members,
      messages,
    };

    return this.ok(response);
  }
}
