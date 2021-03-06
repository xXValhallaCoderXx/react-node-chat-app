import Logger from 'chat-server/loaders/logger-config';
import capitalize from 'lodash/capitalize';
import PROTOCOLS from 'chat-shared/socket-types';
import { Result } from 'chat-server/shared/classes';
import { UserServices, UserType } from 'chat-server/src/user';
import { RoomServices, RoomType } from 'chat-server/src/room';
import { MessageServices } from 'chat-server/src/messages';
import { generateMessage } from './utils';
import { Socket } from 'socket.io';

interface SocketProps {
  userUid: string;
  roomUid: string;
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
          const { uid } = userOrError.getValue();
          socket.userUid = uid;
          const updateUserOrError: Result<UserType> = await this.userServices.updateUser(uid, { online: true });
          if (updateUserOrError.isFailure) {
            Logger.error('Disconnect - Error updating user');
            throw new Error(updateUserOrError.error);
          }
          next();
        }
      });

      /************************
        USER JOINS CHAT ROOM
      *************************/
      socket.on(PROTOCOLS.JOIN_ROOM, async (roomUid: string) => {
        Logger.info('Store Room UID');
        // @ts-ignore
        socket.roomUid = roomUid;
        Logger.info('Attempting to join room: ' + roomUid);
        const joinOrError: Result<any> = await this.roomServices.joinRoom(roomUid, socket.userUid);
        if (joinOrError.isFailure) {
          Logger.error('Error - Join Room: ', joinOrError.error);
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error occured trying to join this room');
        }
        socket.join(roomUid);
        const userOrError: Result<UserType> = await this.userServices.fetchUser(socket.userUid);
        if (userOrError.isFailure) {
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error user not found');
        }

        const roomInfoOrError: Result<RoomType> = await this.roomServices.fetchRoomInfo(roomUid);
        if (roomInfoOrError.isFailure) {
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error room not found');
        }

        const { username } = userOrError.getValue();
        const welcomeMessage = generateMessage({ username: 'Admin', message: 'Welcome to Valhalla!', roomUid });
        const announceMessage = generateMessage({
          username: 'Admin',
          message: `${capitalize(username)} has joined Valhalla!`,
          roomUid,
        });

        // Check for better way to handle this
        socket.broadcast.to(roomUid).emit(PROTOCOLS.SERVER_TO_CLIENT_MSG, announceMessage);
        socket.broadcast.to(roomUid).emit(PROTOCOLS.UPDATE_ROOM_USER, roomInfoOrError.getValue());
        socket.emit(PROTOCOLS.UPDATE_ROOM_USER, roomInfoOrError.getValue());
        socket.emit(PROTOCOLS.SERVER_TO_CLIENT_MSG, welcomeMessage);
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
        const { username } = userOrError.getValue();
        const newMessage = generateMessage({ username, message, roomUid });
        this.io.to(roomUid).emit(PROTOCOLS.SERVER_TO_CLIENT_MSG, newMessage);
      });

      /*****************************
        CLIENT SEND PAINT TO SERVER
      ******************************/
      // socket.on(PROTOCOLS.CLIENT_TO_SERVER_DRAW, async (data: any) => {
      //   const { uid: roomUid, lineInfo } = data;
      //   const line = lineInfo.line.map((currentLine: any) => {
      //     return {
      //       ...currentLine,
      //       strokeColor: lineInfo.strokeColor,
      //     };
      //   });
      //   socket.broadcast.to(roomUid).emit(PROTOCOLS.SERVER_TO_CLIENT_DRAW, line);
      // });

      // TODO -Fix Being called twice on browser close
      // Todo - Fix Update user repo
      // Should not use broadcast also if multi room socket.to is better
      socket.on(PROTOCOLS.DISCONNECT, async () => {
        const { userUid, roomUid } = socket;

        if (userUid && roomUid) {
          const updateUserOrError: Result<UserType> = await this.userServices.updateUser(userUid, { online: false });
          if (updateUserOrError.isFailure) {
            Logger.error('Disconnect - Error updating user');
          }
          Logger.error(`Whjat :`, updateUserOrError.getValue())
          // @ts-ignore
          const roomInfoOrError: Result<RoomType> = await this.roomServices.fetchRoomInfo(roomUid);
          if (roomInfoOrError.isFailure) {
            socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error room not found');
          }
          // @ts-ignore
          socket.broadcast.to(socket.roomUid).emit(PROTOCOLS.UPDATE_ROOM_USER, roomInfoOrError.getValue());
          // const { username } = updateUserOrError.getValue();
          const exitMessage = generateMessage({ username: 'Admin', message: `User has left!`, roomUid });
          socket.broadcast.emit(PROTOCOLS.SERVER_TO_CLIENT_MSG, exitMessage);
        } else {
          socket.emit(PROTOCOLS.SOCKET_SERVER_ERROR, 'Error room not found');
        }
      });
    });
  }
}

export default ChatSocketController;
