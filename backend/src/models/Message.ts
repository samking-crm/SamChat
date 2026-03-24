// backend/src/models/Message.ts
import mongoose, { Schema } from 'mongoose';

export interface IMessage extends mongoose.Document {
  chatId: string;
  sender: string;
  receiver: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  status: 'sent' | 'delivered' | 'seen';
  timestamp: Date;
  scheduledFor?: Date;
}

const MessageSchema = new Schema<IMessage>({
  chatId: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'video', 'audio', 'file'], default: 'text' },
  status: { type: String, enum: ['sent', 'delivered', 'seen'], default: 'sent' },
  timestamp: { type: Date, default: Date.now },
  scheduledFor: { type: Date }
});

export default mongoose.model<IMessage>('Message', MessageSchema);
