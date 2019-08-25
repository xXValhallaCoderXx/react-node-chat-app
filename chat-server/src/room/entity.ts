import { Result } from 'chat-server/shared/classes';
import { Room as RoomType } from './interface';
import uuidv4 from 'uuid/v4';

export default class Room implements RoomType {
  public uid: string;
  public name: string;
  public members: any[];

  private constructor(name: string) {
    this.uid = uuidv4();
    this.name = name;
    this.members = [];
  }

  public static async create(name: string): Promise<Result<Room>> {
    if (!name || name.length <= 1) {
      return Result.fail<Room>('Name is invalid');
    }

    return Result.ok<Room>(new Room(name));
  }
}
