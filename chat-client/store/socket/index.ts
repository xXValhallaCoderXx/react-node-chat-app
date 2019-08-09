import Socket from './socket';
import PROTOCOLS from 'chat-shared/socket-types';
import { chatActions } from 'chat-client/store';

export const socketActions = {
  connect: token => {
    return { type: PROTOCOLS.CONNECT, payload: token };
  },
  // joinRoom: ({ username, room }) => {
  //   return { type: PROTOCOLS.JOIN_ROOM, payload: { username, room } };
  // },
  sendMessage: (message: string, roomUid: string) => {
    return { type: PROTOCOLS.SEND_MESSAGE, payload: { message, uid: roomUid } };
  },
  // drawing: (roomUid: string, data: any) => {
  //   return { type: PROTOCOLS.CLIENT_TO_SERVER_DRAW, payload: { lineInfo: data, room: roomUid } };
  // },
};

const socketMiddleware = ({ dispatch }) => {
  // Emit Action on Error
  // const onSocketError = payload => dispatch(globalActions.handleFeedback(payload));
  // Handle messages recieved from server
  // const onMessageRecieved = payload => dispatch(chatActions.recieveMessage(payload));
  // Handle users joining room
  // const onRoomUserUpdate = payload => dispatch(chatActions.roomUserUpdate(payload));
  // Handle paint updates
  // const onPaintUpdate = payload => dispatch(paintActions.paintUpdate(payload));

  const socket = new Socket();

  return next => action => {
    switch (action.type) {
      case PROTOCOLS.CONNECT:
        socket.connect(action.payload);
        break;
      case PROTOCOLS.SEND_MESSAGE:
        socket.sendMessage(action.payload);
        break;
      // case PROTOCOLS.CLIENT_TO_SERVER_DRAW:
      //   socket.drawing(action.payload);
      //   break;
      // case PROTOCOLS.JOIN_ROOM:
      //   socket.joinRoom(action.payload);
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default socketMiddleware;
