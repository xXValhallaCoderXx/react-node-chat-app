import { BaseController, Result } from 'chat-server/shared/classes';
import { UserServices, UserType } from 'chat-server/src/user';
import { RoomServices, RoomType } from 'chat-server/src/room';

export default class RegisterController extends BaseController {
  userService = new UserServices();
  roomService = new RoomServices();

  protected async executeImpl(): Promise<any> {
    const { email, username, password } = this.req.body;
    const userOrError: Result<UserType> = await this.userService.createUser({ email, username, password });
    if (userOrError.isFailure) {
      return this.fail({title: "Registration - Create user error", message: userOrError.error});
    }
    const roomsOrError: Result<RoomType[]> = await this.roomService.fetchRoomsList();
    if (roomsOrError.isFailure) {
      return this.fail({title: "Registration - Fetch Rooms List Error", message: roomsOrError.error});
    }
    const { online, token } = userOrError.getValue();
    return this.ok({
      user: { online, token, email, username },
      rooms: roomsOrError.getValue(),
    });
  }
}
