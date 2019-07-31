const env = process.env.NODE_ENV || 'development';
// Depending on the enviroment, this will pull the values from the respective .json file and add the values as process.env variables

const config = require('chat-shared/env-keys.json');
const envConfig = config[env];

// Makes all object keys into an array
Object.keys(envConfig).forEach(key => {
  // Creates ENV variables for all in the config file
  process.env[key] = envConfig[key];
});

// export default {
//   // @ts-ignore
//   port: parseInt(process.env.PORT) || 3000,
//   jwtSecret: process.env.JWT_SECRET,
//   databaseURL: process.env.MONGODB_URI || '',
//   logLevel: process.env.LOG_LEVEL || 'silly',
//   nodeEnv: process.env.NODE_ENV || 'development',
//   defaultRoom: process.env.DEFAULT_ROOM,
//   defaultPaintRoom: process.env.DEFAULT_PAINT_ROOM,
// };
