import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        currentUser: null,
        token: null,
        isAuthenticated: false,

        login: (user, token) => set({
          currentUser: user,
          token,
          isAuthenticated: true
        }),

        logout: () => set({
          currentUser: null,
          token: null,
          isAuthenticated: false
        }),

        setUser: (user) => set({ currentUser: user }),
      }),
      {
        name: 'samchat-auth',
        partialize: (state) => ({ currentUser: state.currentUser, token: state.token, isAuthenticated: state.isAuthenticated })
      }
    ),
    { name: 'SamChat Auth' }
  )
);

export default useAuthStore;
