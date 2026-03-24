// frontend/src/components/MessageInput.tsx
import { useState, KeyboardEvent } from 'react';
import { useChatStore } from '../store/chatStore';
import { Send, Mic, Smile, Paperclip } from 'lucide-react';

interface Props {
  chatId: string;
}

const MessageInput = ({ chatId }: Props) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { sendMessage, setTyping } = useChatStore();

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(chatId, message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end space-x-3">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-3 pr-12 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
        />
        <button className="absolute right-3 bottom-3.5">
          <Smile className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <button
        onClick={handleSend}
        className="w-12 h-12 bg-indigo-500 hover:bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MessageInput;
