import Repository from './repository';
import Logger from 'chat-server/loaders/logger-config';
import { Result } from 'chat-server/shared/classes';
import { default as UserEntity } from './entity';
import User from './model';
import { User as UserType } from './interface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export default class UserServices {
  private repo = new Repository(User);

  public async createUser({ email, username, password }: CreateUser): Promise<Result<UserType>> {
    const validUserOrError = await UserEntity.create(email, username, password);

    if (validUserOrError.isFailure) {
      return Result.fail(validUserOrError.error);
    }

    const userOrError = await this.repo.create(validUserOrError.getValue());
    if (userOrError.isFailure) {
      Logger.error('User Services - Create User: ', userOrError.error);
      return Result.fail('Error creating user');
    }

    const user = userOrError.getValue();
    const tokenOrError = await this.generateToken(user.uid);
    if (tokenOrError.isFailure) {
      Logger.error('User Services - Create User Token: ', tokenOrError.error);
      return Result.fail('Error occured generating token');
    }

    user.token = tokenOrError.getValue();
    //@ts-ignore
    user.save();
    Logger.info('User Service - User created');
    return Result.ok(user);
  }

  private async generateToken(uid: string): Promise<Result<string>> {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET).toString();
    const userOrError = await this.repo.update(uid, { token });
    if (userOrError.isFailure) {
      return Result.fail(userOrError.error);
    }
    return Result.ok(token);
  }

  public async handleLogin(email: string, password: string): Promise<Result<UserType>> {
    const userOrError: Result<UserType> = await this.repo.findOne({
      filterBy: { email },
      filterFields: 'online uid username email token password',
    });
    if (userOrError.isFailure) {
      Logger.error('User Service - Login: User not found');
      return Result.fail('Invalid username or password');
    }
    const user = userOrError.getValue();
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      Logger.error('User Service - Login: Invalid password');
      return Result.fail('Invalid username or password');
    }

    const tokenOrError = await this.generateToken(user.uid);
    if (tokenOrError.isFailure) {
      Logger.error('User Service - Login: Error generating token');
      return Result.fail('Sorry an error occured');
    }
    user.token = tokenOrError.getValue();
    // @ts-ignore Must fix
    user.save();
    Logger.info('User Service - Login: User logged in');
    return Result.ok(user);
  }

  public async fetchUser(uid: string): Promise<Result<UserType>> {
    const userOrError: Result<UserType> = await this.repo.findOne({ filterBy: { uid } });
    if (userOrError.isFailure) {
      Logger.error('User Service - Fetch: User not found');
      return Result.fail('Invalid username or password');
    }
    return Result.ok(userOrError.getValue());
  }
  public async findbyToken(token: string): Promise<Result<any>> {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const userOrError: Result<UserType> = await this.repo.findOne({ filterBy: { uid: decoded.uid } });
    if (userOrError.isFailure) {
      Logger.error('User Service - Fetch: User not found');
      return Result.fail('Invalid Token');
    }
    return Result.ok(userOrError.getValue());
  }
  
  public async updateUser(uid: string, data: object): Promise<Result<any>> {
    const userOrError = await this.repo.update(uid, data);
    console.log("USER OR ERROR: ", userOrError)
    if (userOrError.isFailure) {
      return Result.fail(userOrError.error);
    }
    return Result.ok(userOrError.getValue());
  }
}
