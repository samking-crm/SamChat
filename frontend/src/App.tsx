// frontend/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
import { AuthProvider } from './store/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ChatList />} />
              <Route path="/chat/:chatId" element={<ChatRoom />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
