import { BaseController } from 'chat-server/shared/classes';
import { RoomServices } from 'chat-server/src/room';

export default class JoinController extends BaseController {
  roomService = new RoomServices();
  protected async executeImpl(): Promise<any> {
    const { uid } = this.req.params;
    const { userUid } = this.req.body;
    if (!userUid) {
      return this.fail({title: "Room Controller - Join", message: "User UID is missing"});
    }
    const resultOrError = await this.roomService.joinRoom(uid, userUid);
    if (resultOrError.isFailure) {
      return this.fail({title: "Room Controller - Join", message: resultOrError.error});
    }
    return this.ok(resultOrError.getValue());
  }
}
