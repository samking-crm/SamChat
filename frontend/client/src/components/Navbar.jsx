import SamChatLogo from '../assets/SamChatLogo';
import { Bell, Settings, Moon, Sun, Menu, User } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser, logout } = useAuthStore();

  return (
    <div className="h-16 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white/80 dark:bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <SamChatLogo className="w-9 h-9" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
          <User className="w-5 h-5" />
        </button>
        <button 
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;/
