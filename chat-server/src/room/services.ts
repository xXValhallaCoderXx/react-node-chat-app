import Repository from './repository';
import { Result } from 'chat-server/shared/classes';
import { UserServices, UserType } from 'chat-server/src/user';
import Logger from 'chat-server/loaders/logger-config';
import { default as RoomEntity } from './entity';
import Room from './model';
import { Room as RoomType } from './interface';

export default class RoomServices {
  private repo = new Repository(Room);
  private userService = new UserServices();

  public async create(name: string): Promise<Result<RoomType>> {
    const roomOrError = await RoomEntity.create(name);
    if (roomOrError.isFailure) {
      Logger.error('Room Services - Create Enitiy: ', roomOrError.error);
      return Result.fail(roomOrError.error);
    }
    const room = roomOrError.getValue();
    const createRoomOrError = await this.repo.create(room);
    if (createRoomOrError.isFailure) {
      Logger.error('Room Services - Create Room: ', createRoomOrError.error);
      return Result.fail('Error creating room');
    }
    return Result.ok(room);
  }

  public async fetchRoomsList(): Promise<Result<RoomType[]>> {
    const roomsOrError: Result<RoomType[]> = await this.repo.find({ filterFields: 'name uid -_id' });
    if (roomsOrError.isFailure) {
      return Result.fail(roomsOrError.error);
    }
    return Result.ok(roomsOrError.getValue());
  }

  public async fetchRoom(roomUid: string): Promise<Result<RoomType>> {
    const roomOrError: Result<RoomType> = await this.repo.findOne({ filterBy: { uid: roomUid } });
    if (roomOrError.isFailure) {
      return Result.fail(roomOrError.error);
    }
    return Result.ok(roomOrError.getValue());
  }

  public async joinRoom(roomUid: string, userUid: string): Promise<Result<any>> {
    if (!roomUid || !userUid) {
      return Result.fail('Missing UID');
    }

    const roomsOrError: Result<RoomType> = await this.repo.findOne({ filterBy: { uid: roomUid } });
    if (roomsOrError.isFailure) {
      return Result.fail('Room not found');
    }

    const userOrError: Result<UserType> = await this.userService.fetchUser(userUid);
    if (userOrError.isFailure) {
      return Result.fail('User not found');
    }
    const result = await this.repo.addUserToRoom(userOrError.getValue(), roomUid);
    return Result.ok(result);
  }
}
