// ADD THESE LINES AFTER authRoutes:
app.use('/api/users', require('./src/routes/users'));
app.use('/api/messages', require('./src/routes/messages'));
app.use('/api/posts', require('./src/routes/posts'));
