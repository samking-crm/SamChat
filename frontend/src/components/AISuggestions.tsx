// frontend/src/components/AISuggestions.tsx
const AISuggestions = ({ conversation }: { conversation: Message[] }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const generateReplies = async () => {
      const res = await api.post('/ai/smart-replies', {
        conversation: conversation.slice(-5).map(m => m.content)
      });
      setSuggestions(res.data.replies);
    };

    if (conversation.length > 2) generateReplies();
  }, [conversation]);

  return (
    <div className="flex space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {suggestions.map((reply, i) => (
        <button
          key={i}
          className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => insertReply(reply)}
        >
          {reply}
        </button>
      ))}
    </div>
  );
};
