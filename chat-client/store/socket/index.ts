import { actionCreator } from 'chat-client/shared/utils/redux-helpers';

export enum SocketActionTypes {
  CONNECT = '@@socket/CONNECT',
}

export const actions = {
  connectSocket: (token: string) => {
    return {
      type: SocketActionTypes.CONNECT,
      event: 'connect',
      payload: token,
    };
  },
};
