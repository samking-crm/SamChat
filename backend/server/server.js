// ADD THESE LINES AFTER authRoutes:
app.use('/api/users', require('./src/routes/users'));
app.use('/api/messages', require('./src/routes/messages'));
app.use('/api/posts', require('./src/routes/posts'));
// ... existing code ...

// Import socket handler
const socketHandler = require('./sockets/socketHandler');

// Socket.IO - FULL IMPLEMENTATION
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);
  
  // Health check
  socket.emit('connection_success', { message: 'Connected to SamChat!' });
  
  // Delegate to handler
  socketHandler(io, socket);
});

// ... rest of server.js
