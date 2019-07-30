import { BaseController, Result } from 'chat-server/shared/classes';
import { UserServices, UserType } from 'chat-server/src/user';

export default class RegisterController extends BaseController {
  userService = new UserServices();

  protected async executeImpl(): Promise<any> {
    const { email, username, password } = this.req.body;
    const userOrError: Result<UserType> = await this.userService.createUser({ email, username, password });
    if (userOrError.isFailure) {
      return this.fail(userOrError.error);
    }
    return this.ok(userOrError.getValue());
  }
}
