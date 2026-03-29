const MessageBubble = ({ message }) => {
  const isSent = message.sender === 'me';

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div className={`message-bubble ${isSent ? 'message-sent' : 'message-received'} max-w-[70%]`}>
        <p className="text-sm break-words">{message.content}</p>
        <div className={`flex items-center gap-1 mt-2 ${isSent ? 'justify-end' : 'justify-start'}`}>
          <span className={`text-xs ${isSent ? 'text-primary/80' : 'text-gray-500'}`}>
            {message.time}
          </span>
          {isSent && (
            <div className="flex gap-0.5 ml-1">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
