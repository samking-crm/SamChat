// backend/src/models/Chat.ts
import mongoose, { Schema } from 'mongoose';

export interface IChat extends mongoose.Document {
  participants: string[];
  lastMessage: {
    content: string;
    sender: string;
    timestamp: Date;
  };
  unreadCount: { [userId: string]: number };
}

const ChatSchema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: {
    content: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
  },
  unreadCount: { type: Map, of: Number, default: {} }
}, { timestamps: true });

export default mongoose.model<IChat>('Chat', ChatSchema);
