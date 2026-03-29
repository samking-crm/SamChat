const TypingIndicator = () => (
  <div className="flex items-center gap-2 p-3">
    <div className="flex gap-1">
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]" />
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
    </div>
    <span className="text-sm text-gray-500">Someone is typing...</span>
  </div>
);

export default TypingIndicator;
