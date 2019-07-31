export {}; // Need to make this file a module

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      MONGODB_URI: string;
      PORT: string;
      SERVER_PORT: string;
      DEFAULT_ROOM: string;
      DEFAULT_PAINT_ROOM: string;
      LOG_LEVEL: string;
      NODE_ENV: string;
    }
  }
}
