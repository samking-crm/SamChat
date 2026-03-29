import { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, Smile, Phone, Video, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import useChatStore from '../store/chatStore';

const ChatWindow = ({ currentChat }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { addMessage } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      content: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    addMessage(message);
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-4">
          <MessageCircle className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">
          Welcome to SamChat
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Pick a conversation to start chatting. Your messages are end-to-end encrypted.
        </p>
        <div className="flex gap-3 text-sm text-gray-500">
          <Phone className="w-5 h-5" />
          <Video className="w-5 h-5" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-secondary">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 sticky top-0 bg-white/80 dark:bg-secondary/80 backdrop-blur-sm z-10">
        <img 
          src={currentChat.avatar} 
          alt={currentChat.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-secondary dark:text-white truncate">
            {currentChat.name}
          </h3>
          <p className="text-sm text-green-500">online</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-secondary/80 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <button className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-800 rounded-3xl text-secondary dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="absolute right-2 bottom-2 p-2 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <button className="p-3 rounded-2xl hover:bg-accent hover:text-white transition-all">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
