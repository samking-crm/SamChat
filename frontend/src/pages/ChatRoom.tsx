// frontend/src/pages/ChatRoom.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { Phone, Video, Mic, Image, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatRoom = () => {
  const { chatId } = useParams();
  const { user } = useAuthStore();
  const { messages, fetchMessages, sendMessage, socket, partner } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);
  const [showMediaPanel, setShowMediaPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) fetchMessages(chatId!);
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('typing', ({ userId, isTyping }: any) => {
        if (userId !== user?.id) setIsTyping(isTyping);
      });
      socket.on('newMessage', (message: any) => {
        if (message.chatId === chatId) {
          // Auto-scroll and update
        }
      });
    }

    return () => {
      socket?.off('typing');
      socket?.off('newMessage');
    };
  }, [socket, chatId]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {partner?.username?.[0]?.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {partner?.username}
            </p>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Phone className="w-6 h-6 text-gray-500 p-2 hover:bg-gray-200 rounded-full cursor-pointer" />
          <Video className="w-6 h-6 text-gray-500 p-2 hover:bg-gray-200 rounded-full cursor-pointer" />
          <MoreVertical className="w-6 h-6 text-gray-500 p-2 hover:bg-gray-200 rounded-full cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message._id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <MessageInput chatId={chatId!} />
      </div>

      {/* Media Panel */}
      {showMediaPanel && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-20 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-4 z-40"
        >
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-xl">
              <Image className="w-6 h-6 mb-1" />
              <span className="text-xs">Photo</span>
            </button>
            <button className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-xl">
              <Video className="w-6 h-6 mb-1" />
              <span className="text-xs">Video</span>
            </button>
            <button className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-xl">
              <Mic className="w-6 h-6 mb-1" />
              <span className="text-xs">Voice</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatRoom;
