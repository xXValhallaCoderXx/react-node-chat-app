import Logger from 'chat-server/loaders/logger-config';
import PROTOCOLS from 'chat-shared/socket-types';
import { Result } from 'chat-server/shared/classes';
import { UserServices, UserType } from 'chat-server/src/user';
import { RoomServices, RoomType } from 'chat-server/src/room';
import { MessageServices } from 'chat-server/src/messages';
import { generateMessage } from './utils';
import { Socket } from 'socket.io';

interface SocketProps {
  userUid: string;
}

type IOSocket = Socket & SocketProps;

class ChatSocketController {
  userServices = new UserServices();
  roomServices = new RoomServices();
  messageServices = new MessageServices();
  public io: any;

  public constructor(server: any) {
    this.io = require('socket.io')(server);
    this.initializeChatSockets();
  }

  public initializeChatSockets() {
    this.io.on(PROTOCOLS.CONNECT, (socket: IOSocket) => {
      socket.use(async (packet: any, next: any) => {
        const { token } = socket.handshake.query;
        if (!token) {
          throw new Error('Token is missing!');
        } else {
          const userOrError: Result<UserType> = await this.userServices.findbyToken(token);
          if (userOrError.isFailure) {
            throw new Error(userOrError.error);
          }
          socket.userUid = userOrError.getValue().uid;
          next();
        }
      });

      Logger.info('Client connected');

      /************************
        USER JOINS CHAT ROOM
      *************************/
      socket.on(PROTOCOLS.JOIN_ROOM, async (roomUid: string) => {
        Logger.info('Attempting to join room: ' + roomUid);
        const joinOrError: Result<any> = await this.roomServices.joinRoom(roomUid, socket.userUid);
        if (joinOrError.isFailure) {
          Logger.error('Error - Join Room: ', joinOrError.error);
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error occured trying to join this room');
        }
        socket.join(roomUid);
        const welcomeMessage = generateMessage('Admin', 'Welcome to Valhalla!');
        const announceMessage = generateMessage('Admin', 'This user has joined Valhalla');
        socket.emit(PROTOCOLS.SERVER_TO_CLIENT_MSG, welcomeMessage);
        socket.broadcast.to(roomUid).emit(PROTOCOLS.CLIENT_TO_SERVER_MSG, announceMessage);
      });

      /*****************************
        CLIENT SEND MSG TO SERVER
      ******************************/
      socket.on(PROTOCOLS.CLIENT_TO_SERVER_MSG, async (data: any) => {
        const { uid: roomUid, message } = data;
        const { userUid } = socket;
        const userOrError: Result<UserType> = await this.userServices.fetchUser(userUid);
        if (userOrError.isFailure) {
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error user not found');
        }
        const roomOrError: Result<RoomType> = await this.roomServices.fetchRoom(roomUid);
        if (roomOrError.isFailure) {
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error room not found');
        }
        const messageOrError: Result<any> = await this.messageServices.createMessage(
          message,
          roomOrError.getValue(),
          userOrError.getValue(),
        );
        if (messageOrError.isFailure) {
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error room not found');
        }
        const newMessage = generateMessage(userOrError.getValue().username, message);
        this.io.to(roomUid).emit(PROTOCOLS.SERVER_TO_CLIENT_MSG, newMessage);
      });

      /*****************************
        CLIENT SEND PAINT TO SERVER
      ******************************/
      socket.on(PROTOCOLS.CLIENT_TO_SERVER_DRAW, async (data: any) => {
        const { uid: roomUid, lineInfo } = data;
        const line = lineInfo.line.map((currentLine: any) => {
          return {
            ...currentLine,
            strokeColor: lineInfo.strokeColor,
          };
        });
        socket.broadcast.to(roomUid).emit(PROTOCOLS.SERVER_TO_CLIENT_DRAW, line);
      });
    });
  }
}

export default ChatSocketController;
