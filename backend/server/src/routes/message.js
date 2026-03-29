const express = require('express');
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const Chat = require('../models/Chat');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({ 
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
    .populate('sender', 'name avatar')
    .populate('receiver', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(50);
    
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, content, mediaUrl, mediaType } = req.body;
    
    // Create or update chat
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, receiverId], $size: 2 }
    });
    
    if (!chat) {
      chat = new Chat({
        participants: [req.user._id, receiverId]
      });
      await chat.save();
    }

    const message = new Message({
      chatId: chat._id,
      sender: req.user._id,
      receiver: receiverId,
      content,
      mediaUrl,
      mediaType
    });
    
    await message.save();
    
    // Update chat last message
    chat.lastMessage = message._id;
    chat.updatedAt = new Date();
    await chat.save();

    await message.populate('sender', 'name avatar');
    await message.populate('receiver', 'name avatar');

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
