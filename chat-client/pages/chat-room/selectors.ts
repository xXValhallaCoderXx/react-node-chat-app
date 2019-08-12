import { createSelector } from 'reselect';
import { Room, Messages } from 'chat-client/shared/types';
import {format} from "date-fns";

const getRoom = (state, ownProps) => state.chat.rooms[ownProps.match.params.uid];

export const parseRoomData = createSelector(
  [getRoom],
  (room: Room) => {
    const parseMessages = room.messages.map((message: Messages) => {
      return {
        uid: message.uid,
        message: message.message,
        author: message.author,
        createdAt: format(message.createdAt, "Do MMM YYYY - HH:mm A")
      }
    })
    return {
      members: room.members,
      messages: parseMessages,
      name: room.name,
      uid: room.uid
    }
  },
);
