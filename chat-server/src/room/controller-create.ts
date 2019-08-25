import Logger from 'chat-server/loaders/logger-config';
import { BaseController, Result } from 'chat-server/shared/classes';
import { RoomServices, RoomType } from 'chat-server/src/room';

export default class CreateController extends BaseController {
  roomService = new RoomServices();
  protected async executeImpl(): Promise<any> {
    const { name } = this.req.body;
    const roomOrError: Result<RoomType> = await this.roomService.create(name);
    if (roomOrError.isFailure) {
      Logger.error('Controller - Room Create: ', roomOrError.error);
      return this.fail({title: "Room Controller - Create", message: roomOrError.error});
    }
    return this.ok(roomOrError.getValue());
  }
}
