import { useEffect } from 'react';
import { MessageCircle, Users, Phone, Video } from 'lucide-react';
import useChatStore from '../store/chatStore';

const ChatList = ({ onChatSelect }) => {
  const { onlineUsers } = useChatStore();

  const chatsData = [
    { 
      id: '1', 
      name: 'John Doe', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      lastMessage: 'Hey! How are you doing?', 
      time: '2m', 
      online: true, 
      unread: 2,
      preview: 'Lorem ipsum dolor sit amet...'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      lastMessage: 'See you tomorrow!', 
      time: '1h', 
      online: false, 
      unread: 0
    },
    { 
      id: '3', 
      name: 'Team Meeting', 
      avatar: 'https://images.unsplash.com/photo-1582213785498-0fd94f2293b5?w=150',
      lastMessage: 'Meeting rescheduled to 3pm', 
      time: '5h', 
      online: true, 
      unread: 1,
      group: true
    },
  ];

  return (
    <div className="w-full md:w-80 bg-white dark:bg-secondary border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 sticky top-0 bg-white/80 dark:bg-secondary/80 backdrop-blur-sm z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-secondary dark:text-white">Messages</h1>
          <p className="text-xs text-gray-500">{onlineUsers.size} online</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 sticky top-20 bg-white/50 dark:bg-secondary/50 backdrop-blur-sm z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-sm text-secondary dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {chatsData.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex gap-4 border-b border-gray-100 dark:border-gray-700 transition-colors group last:border-b-0"
          >
            <div className="relative flex-shrink-0">
              <img 
                src={chat.avatar} 
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
              />
              {chat.online && (
                <div className="w-3.5 h-3.5 bg-accent rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-white shadow-sm" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-secondary dark:text-white truncate text-sm">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto">
                  <span className="text-xs font-bold text-white">{chat.unread}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all ml-auto">
              <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
