import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ChatLayout from './layouts/ChatLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import useAuthStore from './store/authStore';

function App() {
  const { currentUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Routes>
        <Route 
          path="/auth/*" 
          element={!currentUser ? <AuthLayout /> : <Navigate to="/chats" />}
        />
        <Route 
          path="/*" 
          element={currentUser ? <ChatLayout /> : <Navigate to="/auth/login" />}
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
