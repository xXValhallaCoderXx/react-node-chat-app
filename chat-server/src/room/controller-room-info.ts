import { BaseController, Result } from 'chat-server/shared/classes';
import { MessageServices, MessageType } from 'chat-server/src/messages';
import { Room as RoomType } from './interface';
import Logger from 'chat-server/loaders/logger-config';
import Repository from './repository';
import Room from './model';

export default class RoomInfo extends BaseController {
  private repo = new Repository(Room);
  private messageServices = new MessageServices();
  protected async executeImpl(): Promise<any> {
    const { uid } = this.req.params;
    Logger.info(`Fetching room info for: ${uid}`)
    const roomOrError: Result<RoomType> = await this.repo.fetchRoomInfo(uid);
    if(roomOrError.isFailure){
      return this.notFound(roomOrError.error);
    }
    const room = roomOrError.getValue();
    const messagesOrError: any = await this.messageServices.fetchRoomMessages(room);
    if (messagesOrError.isFailure) {
      Logger.error('Controller - Room Info: ', messagesOrError.error);
      return this.fail('Error getting messages');
    }
    const messages: any = messagesOrError.getValue().map(item => {
      return {
        uid: item._id,
        message: item.message,
        createdAt: item.createdAt,
        author: item.author.username,
      };
    });

    const response = {
      uid: room.uid,
      name: room.name,
      members: room.members,
      messages,
    };
    

    return this.ok(response);
  }
}
