import { useEffect } from 'react';
import { MessageCircle, Users } from 'lucide-react';
import useChatStore from '../store/chatStore';

const ChatList = () => {
  const { chats, setCurrentChat, currentChat, onlineUsers } = useChatStore();

  const chatsData = 
    

  return (
    <div className="w-full md:w-80 bg-white dark:bg-secondary border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-secondary dark:text-white">SamChat</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-secondary dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {chatsData.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setCurrentChat(chat)}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex gap-3 border-b border-gray-100 dark:border-gray-700 ${
              currentChat?.id === chat.id ? 'bg-primary/5' : ''
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <span className="font-semibold text-white text-sm">
                  {chat.name.split(' ')[0][0]}
                </span>
              </div>
              {chat.online && (
                <div className="w-3 h-3 bg-accent rounded-full absolute -bottom-1 -right-1 border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
             
