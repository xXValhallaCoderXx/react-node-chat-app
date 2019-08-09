import io from 'socket.io-client';
import PROTOCOL from 'chat-shared/socket-types';

export default class Socket {
  private socket: any;
  // private onMessageRecieved: any;
  // private onRoomDataUpdate: any;

  public constructor() {
    this.socket = null;
    // this.onMessageRecieved = onMessageRecieved;
    // this.onRoomDataUpdate = onRoomDataUpdate;
  }
  // Connect client to server
  public connect = token => {
    if (process.env.NODE_ENV === 'development') {
      const { LOCALHOST, PORT } = process.env;
      const host = `${LOCALHOST}:${PORT}`;
      this.socket = io(host, { query: { token } });
    } else {
      this.socket = io({ query: { token } });
    }
    // Setup Initial Events
    // this.socket.on(PROTOCOL.SERVER_TO_CLIENT_MSG, this.onMessageRecieved);
    // this.socket.on(PROTOCOL.UPDATE_ROOM_USER, this.onRoomDataUpdate);
    // this.socket.on(PROTOCOL.ON_ERROR, this.onSocketError);
  };

  public disconnect = () => {
    this.socket.close();
  };

  public emit = (message: string, cb) => {
    this.socket.emit(PROTOCOL.SEND_MESSAGE, message, cb);
  };

  public joinRoom = (data: any) => {
    this.socket.emit(PROTOCOL.JOIN_ROOM, data.room);
  };

  public sendMessage = (message: string) => {
    this.socket.emit(PROTOCOL.CLIENT_TO_SERVER_MSG, message);
  };

  // public onError = (message: any) => this.onSocketError(message);
}
