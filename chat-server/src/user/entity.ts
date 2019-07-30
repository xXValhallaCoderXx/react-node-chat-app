import { Result } from 'chat-server/shared/classes';
import { User as UserType } from './interface';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcryptjs';

export default class User implements UserType {
  public uid: string;
  public username: string;
  public email: string;
  public password: string;
  public online: boolean;
  public token: string;

  private constructor(email: string, username: string, password: string) {
    this.uid = uuidv4();
    this.online = true;
    this.username = username;
    this.email = email;
    this.password = password;
    this.token = '';
  }

  public static async create(email: string, username: string, password: string): Promise<Result<User>> {
    if (!email || email.length <= 1 || email.length > 20) {
      return Result.fail<User>('Email is invalid');
    }

    if (!username || username.length <= 1 || username.length > 20) {
      return Result.fail<User>('Username is invalid');
    }

    if (!password || password.length < 6) {
      return Result.fail<User>('Password is invalid');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return Result.ok<User>(new User(email, username, hashedPassword));
  }
}
