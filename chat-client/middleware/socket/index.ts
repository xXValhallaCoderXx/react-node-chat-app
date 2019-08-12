import io from 'socket.io-client';

export default () => {
  const socket = new SocketInstance();
  return () => next => action => {
    if (typeof action === 'function') {
      return next(action);
    }

    const { event, remove, handle, subscribe, emit, payload } = action;

    if (!event) {
      return next(action);
    }

    if (action.type === '@@socket/CONNECT') {
      socket.connect(action.payload);
    }

    if (event && remove) {
      socket.remove(event);
    }

    if (event && emit) {
      socket.emit(event, payload);
    }

    if (subscribe && handle) {
      if (typeof handle !== 'function') {
        throw new Error('Handle should be a dispatch function');
      }
      socket.subscribe(event, handle);
    }

    return;
  };
};

class SocketInstance {
  private socket: any;

  public constructor() {
    this.socket = null;
  }
  public connect = token => {
    console.log("TOKEN: ", token);
    if (process.env.NODE_ENV === 'development') {
      const { LOCALHOST, PORT } = process.env;
      const host = `${LOCALHOST}:${PORT}`;
      this.socket = io(host, { query: { token } });
    } else {
      this.socket = io({ query: { token } });
    }
  };

  public disconnect = () => {
    this.socket.close();
  };

  public remove = event => {
    this.socket.removeListener(event);
  };

  public subscribe = (event: string, handle: Function) => {
    this.socket.on(event, handle);
  };

  public emit = (event: string, payload: any) => {
    this.socket.emit(event, payload);
  };
}
