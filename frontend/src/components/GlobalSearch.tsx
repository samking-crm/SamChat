// frontend/src/components/GlobalSearch.tsx
const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const search = async (q: string) => {
    const res = await api.get(`/search?q=${q}`);
    setResults(res.data);
  };

  return (
    <div className="fixed top-16 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-40 max-h-96 overflow-y-auto">
      <div className="p-4 border-b">
        <input
          placeholder="Search chats, messages, users..."
          className="w-full p-3 bg-transparent border-none outline-none text-lg"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            search(e.target.value);
          }}
        />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {results.map((result) => (
          <SearchResultItem key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};
