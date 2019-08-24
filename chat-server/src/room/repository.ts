import { BaseRepository } from 'chat-server/shared/classes';
import Logger from 'chat-server/loaders/logger-config';
import { Result } from 'chat-server/shared/classes';
import Entity from './entity';
import { Room as RoomType } from './interface';

export default class RoomRepository extends BaseRepository<Entity> {
  public addUserToRoom = async (user: any, roomUid: string): Promise<Result<any>> => {
    try {
      const result = await this.model
        .findOneAndUpdate({ uid: roomUid }, { $addToSet: { members: user } }, { new: true })
        .exec();
      return Result.ok(result);
    } catch (error) {
      Logger.error(`Room Repo - Add User To Room: ${error}`);
      return Result.fail("Error adding user to room");
    }
  };

  public fetchRoomInfo = async (roomUid: string): Promise<Result<RoomType>> => {
    const result: any = await this.model
      .findOne({ uid: roomUid })
      .select('uid name')
      .populate('members', 'username email online -_id')
      .exec();
    if (!result) {
      return Result.fail('No room found');
    } else {
      return Result.ok(result);
    }
  };

  // public roomsAndMembers = async (): Promise<Result<RoomType[]>> => {
  //   try {
  //     const result: any = await this.model
  //       .find({})
  //       .select('uid name -_id')
  //       .populate('members', 'username email -_id')
  //       .exec();
  //     return Result.ok(result);
  //   } catch (error) {
  //     Logger.error('Repository (Room - roomsAndMembers): ', error);
  //     return Result.fail('Error fetching rooms and members');
  //   }
  // };
}
