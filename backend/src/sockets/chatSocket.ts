// backend/src/sockets/chatSocket.ts
import { Server, Socket } from 'socket.io';
import User from '../models/User';
import Chat from '../models/Chat';
import Message from '../models/Message';

export const setupSocket = (io: Server) => {
  io.on('connection', async (socket: Socket) => {
    const userId = socket.handshake.auth.userId;
    
    // Update online status
    await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: new Date() });
    
    socket.join(`user_${userId}`);

    // Typing indicator
    socket.on('typing', ({ chatId, isTyping }) => {
      socket.to(`chat_${chatId}`).emit('typing', { userId, isTyping });
    });

    // Message handling
    socket.on('sendMessage', async ({ chatId, content, type = 'text' }) => {
      const message = new Message({
        chatId,
        sender: userId,
        receiver: chatId.split('_')[1] === userId ? chatId.split('_')[0] : chatId.split('_')[1],
        content,
        type,
        status: 'sent'
      });
      await message.save();

      // Update chat last message
      await Chat.findByIdAndUpdate(chatId, {
        lastMessage: { content, sender: userId, timestamp: new Date() }
      });

      io.to(`chat_${chatId}`).emit('newMessage', message);
    });

    socket.on('messageSeen', async ({ messageId }) => {
      await Message.findByIdAndUpdate(messageId, { status: 'seen' });
      socket.to(`user_${userId}`).emit('messageSeen', { messageId });
    });

    socket.on('disconnect', async () => {
      await User.findByIdAndUpdate(userId, { 
        isOnline: false, 
        lastSeen: new Date() 
      });
      io.emit('userOffline', { userId });
    });
  });
};
