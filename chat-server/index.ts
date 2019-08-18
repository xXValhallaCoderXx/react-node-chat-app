import App from './express-server';
import {createServer, Server} from 'http';
import './config';

// Controllers
import { AuthController } from 'chat-server/src/auth';
import { RoomController } from 'chat-server/src/room';
import { ChatSocketController } from 'chat-server/src/socket-chat';


const app = new App([new AuthController(), new RoomController()]);
const server = createServer(app.getServer());
new ChatSocketController(server);
app.listen(server);