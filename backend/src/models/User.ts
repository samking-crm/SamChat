
// backend/src/models/User.ts
import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password?: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
  followers: string[];
  following: string[];
  premium: boolean;
  settings: {
    readReceipts: boolean;
    onlineStatus: boolean;
  };
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  username: { type: String, required: true, unique: true },
  avatar: { type: String },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  premium: { type: Boolean, default: false },
  settings: {
    readReceipts: { type: Boolean, default: true },
    onlineStatus: { type: Boolean, default: true }
  }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
