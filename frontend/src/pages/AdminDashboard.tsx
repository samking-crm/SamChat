// frontend/src/pages/AdminDashboard.tsx
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeChats: 0,
    premiumUsers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon="👥" />
          <StatCard title="Active Chats" value={stats.activeChats.toLocaleString()} icon="💬" />
          <StatCard title="Premium Users" value={stats.premiumUsers.toLocaleString()} icon="⭐" />
          <StatCard title="Monthly Revenue" value={`$${stats.totalRevenue}`} icon="💰" />
        </div>
      </div>
    </div>
  );
};
