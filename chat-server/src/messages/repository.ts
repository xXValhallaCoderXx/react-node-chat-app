import { BaseRepository } from 'chat-server/shared/classes';
import Entity from './entity';

export default class MessageRepository extends BaseRepository<Entity> {
  public fetchMessagesAndAuthor = async (roomUid: string): Promise<any> => {
    const result: any = await this.model
      .find({ roomID: roomUid })
      .select('message createdAt -_id')
      .populate('author', 'username -_id')
      .exec();
    return result;
  };
}
