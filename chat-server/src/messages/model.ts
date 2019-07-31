import mongoose, { Schema, Document } from 'mongoose';
import { Message as MessageType } from './interface';

const Message: Schema = new Schema(
  {
    roomID: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    message: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
const MessageSchema = mongoose.model<MessageType & Document>('Message', Message);

export default MessageSchema;
