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
          const {uid} = userOrError.getValue()
          socket.userUid = uid;
          const updateUserOrError: Result<UserType> = await this.userServices.updateUser(uid, {online: true});
          if (updateUserOrError.isFailure) {
            Logger.error("Disconnect - Error updating user")
            throw new Error(updateUserOrError.error);
          }
          next();
        }
      });

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
        const welcomeMessage = generateMessage({username: "Admin", message: "Welcome to Valhalla!", roomUid});
        const announceMessage = generateMessage({username: "Admin", message: "This user has joined Valhalla!", roomUid});
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
        const {username} = userOrError.getValue();
        const newMessage = generateMessage({username, message, roomUid});
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

      socket.on(PROTOCOLS.DISCONNECT, async () => {
        const { userUid } = socket;
        Logger.info('Disconnecting user: ' + userUid);
        const updateUserOrError: Result<UserType> = await this.userServices.updateUser(userUid, {online: false});
        if (updateUserOrError.isFailure) {
          Logger.error("Disconnect - Error updating user")
        }
      })
    });
  }
}

export default ChatSocketController;
