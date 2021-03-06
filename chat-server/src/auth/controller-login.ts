import { BaseController, Result } from 'chat-server/shared/classes';
import { UserServices, UserType } from 'chat-server/src/user';
import { RoomServices, RoomType } from 'chat-server/src/room';

export default class LoginController extends BaseController {
  userService = new UserServices();
  roomService = new RoomServices();

  protected async executeImpl(): Promise<any> {
    const { email: inputEmail, password: inputPassword } = this.req.body;
    const userOrError: Result<UserType> = await this.userService.handleLogin(inputEmail, inputPassword);
    if (userOrError.isFailure) {
      return this.fail({title: "Login - Error", message: userOrError.error});
    }

    const roomsOrError: Result<RoomType[]> = await this.roomService.fetchRoomsList();
    if (roomsOrError.isFailure) {
      return this.fail({title: "Login - Fetch Rooms Error", message: roomsOrError.error});
    }

    const { online, token, email, username } = userOrError.getValue();
    return this.ok({
      user: { online, token, email, username },
      rooms: roomsOrError.getValue(),
    });
  }
}
