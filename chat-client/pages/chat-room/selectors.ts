import { createSelector } from 'reselect';
import get from 'lodash/get';
import { Room, Messages } from 'chat-client/shared/types';
import { format, parseISO } from 'date-fns';

const getRoom = (state, ownProps) => state.chat.rooms[ownProps.match.params.uid];
const getUid = (state) =>  state.router.location.pathname;
export const parseRoomData = createSelector(
  [getRoom, getUid],
  (room: Room, urlPath: any) => {
    var uid = urlPath.split("/chat/")
    console.log("UID: ", uid);
    const messages: Messages[] = get(room, 'messages', []);
    const members = get(room, 'members', []);
    const name = get(room, 'name', '');
    const parseMessages = messages.map((message: Messages) => {
      return {
        uid: message.uid,
        message: message.message,
        author: message.author,
        createdAt: format(parseISO(message.createdAt), 'do MMM yyyy - HH:mm'),
      };
    });
    return {
      members,
      messages: parseMessages,
      name,
      uid: uid[1],
    };
  },
);
