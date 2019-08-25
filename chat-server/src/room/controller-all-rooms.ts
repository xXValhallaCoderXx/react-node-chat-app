import { BaseController, Result } from 'chat-server/shared/classes';
import Logger from 'chat-server/loaders/logger-config';
import { RoomType } from 'chat-server/src/room';
import Repository from './repository';
import Room from './model';

export default class RoomsController extends BaseController {
  private repo = new Repository(Room);
  protected async executeImpl(): Promise<any> {
    const roomsOrError: Result<RoomType[]> = await this.repo.find({ filterFields: 'name members uid -_id' });
    if (roomsOrError.isFailure) {
      Logger.error('Controller - Room Fetch All: ', roomsOrError.error);
      return this.fail({ title: 'Room Controller - All Rooms', message: 'Error fetching rooms' });
    }
    return this.ok(roomsOrError.getValue());
  }
}
