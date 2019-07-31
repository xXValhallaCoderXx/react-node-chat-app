import { BaseRepository } from 'chat-server/shared/classes';
import Entity from './entity';
import { Room as RoomType } from './interface';

export default class RoomRepository extends BaseRepository<Entity> {
  public addUserToRoom = async (user: any, roomUid: string): Promise<any> => {
    const result = await this.model
      .findOneAndUpdate({ uid: roomUid }, { $addToSet: { members: user } }, { new: true })
      .exec();
    return result;
  };

  public fetchRoomInfo = async (roomUid: string): Promise<RoomType> => {
    const result: any = await this.model
      .findOne({ uid: roomUid })
      .select('uid name')
      .populate('members', 'username email -_id')
      .exec();
    return result;
  };

  public roomsAndMembers = async (): Promise<RoomType[]> => {
    const result: any = await this.model
      .find({})
      .select('uid name -_id')
      .populate('members', 'username email -_id')
      .exec();
    return result;
  };
}
