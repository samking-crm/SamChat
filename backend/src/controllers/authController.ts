// backend/src/controllers/authController.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, username });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });

    res.status(201).json({
      token,
      user: { id: user._id, email, username, avatar: user.avatar }
    });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password!)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });

    res.json({
      token,
      user: { id: user._id, email, username: user.username, avatar: user.avatar }
    });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};
