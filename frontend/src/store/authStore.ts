// frontend/src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        set({ user: data.user, token: data.token });
        localStorage.setItem('token', data.token);
      },
      register: async (email, password, username) => {
        const { data } = await api.post('/auth/register', { email, password, username });
        set({ user: data.user, token: data.token });
        localStorage.setItem('token', data.token);
      },
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
      }
    }),
    { name: 'auth-storage' }
  )
);
