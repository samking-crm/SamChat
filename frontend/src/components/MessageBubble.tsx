// frontend/src/components/MessageBubble.tsx
import { Message } from '../types';

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const isOwn = message.sender._id === 'currentUserId'; // From auth store

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow ${
        isOwn 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
          : 'bg-white dark:bg-gray-800 border'
      }`}>
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs opacity-75">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isOwn && (
            <div className="flex space-x-1">
              <div className={`w-1.5 h-1.5 rounded-full ${message.status === 'seen' ? 'bg-blue-400' : 'bg-gray-400'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${message.status === 'seen' ? 'bg-blue-400' : 'bg-gray-400'}`} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
