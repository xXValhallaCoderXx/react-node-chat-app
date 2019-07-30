import { Db } from 'mongodb';
import mongoose from 'mongoose';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  mongoose.Promise = global.Promise;
  return connection.connection.db;
};
