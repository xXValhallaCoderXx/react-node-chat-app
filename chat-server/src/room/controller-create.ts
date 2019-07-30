import { BaseController, Result } from 'chat-server/shared/classes';
import { RoomServices, RoomType } from 'chat-server/src/room';

export default class CreateController extends BaseController {
  roomService = new RoomServices();
  protected async executeImpl(): Promise<any> {
    const { name } = this.req.body;
    const roomOrError: Result<RoomType> = await this.roomService.create(name);
    if (roomOrError.isFailure) {
      return this.fail(roomOrError.error);
    }
    return this.ok(roomOrError.getValue());
  }
}
