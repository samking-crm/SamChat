const User = require('../models/User');
const Message = require('../models/Message');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // Join user room
    socket.on('join', async (userId) => {
      socket.join(userId);
      socket.userId = userId;
      
      // Update user online status
      await User.findByIdAndUpdate(userId, { 
        isOnline: true, 
        lastSeen: new Date() 
      });
      
      // Broadcast online status
      socket.broadcast.emit('user_online', { userId });
      io.emit('online_users_update', { userId, isOnline: true });
      
      console.log(`👤 User ${userId} joined room`);
    });

    // Send message
    socket.on('send_message', async (data) => {
      try {
        const { receiverId, content, chatId } = data;
        
        // Save to DB
        const message = new Message({
          chatId,
          sender: socket.userId,
          receiver: receiverId,
          content
        });
        await message.save();

        // Send to receiver
        io.to(receiverId).emit('receive_message', {
          ...message.toObject(),
          sender: socket.userId
        });

        // Send back to sender with status
        socket.emit('message_sent', {
          ...message.toObject(),
          status: 'sent'
        });

      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(data.receiverId).emit('user_typing', {
        senderId: socket.userId,
        chatId: data.chatId
      });
    });

    socket.on('stop_typing', (data) => {
      socket.to(data.receiverId).emit('stop_typing', {
        senderId: socket.userId,
        chatId: data.chatId
      });
    });

    // Message seen
    socket.on('message_seen', async (data) => {
      await Message.findByIdAndUpdate(data.messageId, { 
        status: 'seen' 
      });
      
      socket.to(data.senderId).emit('message_seen', {
        messageId: data.messageId,
        seenBy: socket.userId
      });
    });

    // Calls
    socket.on('call_user', (data) => {
      io.to(data.userToCall).emit('incoming_call', {
        signal: data.signalData,
        from: socket.userId,
        name: data.name
      });
    });

    socket.on('accept_call', (data) => {
      io.to(data.to).emit('call_accepted', data.signal);
    });

    socket.on('reject_call', (data) => {
      io.to(data.from).emit('call_rejected', data.signal);
    });

    // Disconnect
    socket.on('disconnect', async () => {
      if (socket.userId) {
        // Update offline status
        await User.findByIdAndUpdate(socket.userId, { 
          isOnline: false,
          lastSeen: new Date()
        });
        
        socket.broadcast.emit('user_offline', { userId: socket.userId });
        console.log(`❌ User ${socket.userId} disconnected`);
      }
    });
  });
};

module.exports = socketHandler;
