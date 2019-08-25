import mongoose, { Schema, Document } from 'mongoose';
import { User as UserType } from './interface';

const User: Schema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  online: {
    type: Boolean,
    required: true,
    default: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6, // This is length of the plain text
  },
  token: {
    type: String,
  },
});

const UserSchema = mongoose.model<UserType & Document>('User', User);

export default UserSchema;
