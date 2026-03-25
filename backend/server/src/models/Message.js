const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, trim: true },
  mediaUrl: { type: String },
  mediaType: { type: String, enum: ['image', 'video', 'audio', 'file'] },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'seen'], 
    default: 'sent' 
  },
  isScheduled: { type: Boolean, default: false },
  scheduledAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
