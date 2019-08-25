import mongoose, { Schema, Document } from 'mongoose';
import { Room as RoomType } from './interface';

const Room = new Schema(
  {
    uid: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },
    members: [
      {
        // unique: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true, // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  },
);

const RoomSchema = mongoose.model<RoomType & Document>('Room', Room);

export default RoomSchema;
