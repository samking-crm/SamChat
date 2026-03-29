const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const post = new Post({
      user: req.user._id,
      content: req.body.content,
      image: req.body.image
    });
    await post.save();
    await post.populate('user', 'name avatar');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/feed', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name avatar')
      .populate('likes')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
