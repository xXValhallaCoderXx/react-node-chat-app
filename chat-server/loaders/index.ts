import dbLoader from './db-connection';
import Logger from './logger-config';

export default async () => {
  try {
    await dbLoader();
    Logger.info('DB Loaded and connected');
  } catch (error) {
    Logger.error('Loaders: ', error);
  }
};
