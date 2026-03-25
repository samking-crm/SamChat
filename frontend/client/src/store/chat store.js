import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useChatStore = create(devtools((set, get) => ({
  currentUser: null,
  chats: [],
  currentChat: null,
  messages: [],
  isTyping: false,
  onlineUsers: new Set(),

  setCurrentUser: (user) => set({ currentUser: user }),
  setChats: (chats) => set({ chats }),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setMessages: (messages) => set({ messages }),
  setTyping: (typing) => set({ isTyping: typing }),
  setOnlineUsers: (users) => set({ onlineUsers: new Set(users) }),
})));

export default useChatStore;
