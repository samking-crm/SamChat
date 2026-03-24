// frontend/src/pages/ChatList.tsx
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useChatsStore } from '../store/chatsStore';
import ChatItem from '../components/ChatItem';
import { Plus, Search, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatList = () => {
  const { user } = useAuthStore();
  const { chats, fetchChats, onlineUsers } = useChatsStore();
  const [search, setSearch] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user) fetchChats();
  }, [user]);

  const filteredChats = chats.filter(chat => 
    chat.participants[0].username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            SamChat
          </h1>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div className="flex space-x-2">
          <Search className="w-6 h-6 text-gray-500 cursor-pointer" />
          <UserPlus 
            className="w-6 h-6 text-gray-500 cursor-pointer" 
            onClick={() => setShowNewChat(true)}
          />
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredChats.map((chat) => (
            <motion.div
              key={chat._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ChatItem chat={chat} onlineUsers={onlineUsers} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowNewChat(false)}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">New Chat</h2>
            <p>Search users to start chatting...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatList;
