import App from './server';
import http from 'http';
import express from 'express';
import './config';

// Controllers
import { AuthController } from 'chat-server/src/auth';
import { RoomController } from 'chat-server/src/room';
import { ChatSocketController } from 'chat-server/src/socket-chat';

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const port = process.env.PORT;

  new App(app, [new AuthController(), new RoomController()]);
  new ChatSocketController(server);

  await require('./loaders').default();
  server.listen(port, () => {
    console.log(`
    #########################################
    Server listening on port: ${port}
    #########################################
  `);
  });
}

startServer();
