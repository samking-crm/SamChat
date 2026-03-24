// frontend/src/pages/ChatRoom.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { Phone, Video, Mic, Image, Smile, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatRoom = () => {
  const { chatId } = useParams();
  const { user } = useAuthStore();
  const { messages, fetchMessages, sendMessage, socket } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) fetchMessages(chatId);
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('typing', ({ userId, isTyping }) => {
        if (userId !== user?.id) setIsTyping(isTyping);
      });
      socket.on('newMessage', (message) => {
        if (message.chatId === chatId) {
          // Update messages
        }
      });
    }
  }, [socket, chatId]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Chat
