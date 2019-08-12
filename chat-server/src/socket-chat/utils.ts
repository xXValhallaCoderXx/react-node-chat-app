import uuidv4 from "uuid/v4";

interface GenerateMessage {
  roomUid: string;
  author: string;
  message: string;
  uid?: string;
}

export const generateMessage = ({username, message, uid, roomUid}: GenerateMessage) => {
  const date = new Date();
  return {
    roomUid,
    username,
    message,
    createdAt: date.toISOString(),
    uid: uid || uuidv4()
  };
};
