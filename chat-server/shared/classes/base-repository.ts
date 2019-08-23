import { Result } from 'chat-server/shared/classes';
import Logger from '../../loaders/logger-config';

interface Find {
  filterBy?: object;
  filterFields?: string;
}

interface Read<T> {
  find({ filterBy, filterFields }: Find): Result<T[]>;
  findOne({ filterBy, filterFields }: Find): Result<T>;
}

interface Write<T> {
  create(item: T): Promise<Result<T>>;
  update(id: string, item: T): Result<T>;
  delete(id: string): Promise<boolean>;
}

export type BaseRepoType<T> = Read<T> & Write<T>;

// that class only can be extended
export abstract class BaseRepository<T> implements Write<T>, Read<T> {
  public readonly model: any;

  public constructor(model: any) {
    this.model = model;
  }

  public async create(item: T): Promise<Result<T>> {
    try {
      const result = await new this.model(item).save();
      return Result.ok(result);
    } catch (error) {
      return Result.fail(error);
    }
  }

  public findOne({ filterBy, filterFields }: Find): Result<T> {
    try {
      return this.model
        .findOne(filterBy)
        .select(filterFields)
        .then((res: T) => {
          if (res === null) {
            return Result.fail('No result');
          }
          return Result.ok<T>(res);
        });
    } catch (error) {
      return Result.fail(error);
    }
  }

  public find({ filterBy, filterFields }: Find): Result<T[]> {
    return this.model
      .find(filterBy)
      .select(filterFields)
      .then((res: T) => {
        if (res === null) {
          return Result.fail('No results');
        }
        return Result.ok<T>(res);
      })
      .catch((err: any) => {
        return Result.fail(err);
      });
  }

  public update(uid: string, data: any): Result<T> {
    try {
      const user = this.model.findOneAndUpdate({ uid }, { $set: data }, { new: true }, (err: any, doc: T) => {
        return doc;
      });
      Logger.info('User updated: ', user);
      return Result.ok(user);
    } catch (error) {
      return Result.fail('Noope');
    }
  }

  public delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default BaseRepository;
