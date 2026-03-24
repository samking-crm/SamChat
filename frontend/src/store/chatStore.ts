// frontend/src/store/chatStore.ts
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import api from '../services/api';

interface ChatStore {
  socket: Socket | null;
  messages: Message[];
  partner: User | null;
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, content: string) => void;
  setTyping: (isTyping: boolean) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  socket: null,
  messages: [],
  partner: null,
  
  fetchMessages: async (chatId: string) => {
    const { data } = await api.get(`/chat/${chatId}/messages`);
    set({ messages: data });
  },

  sendMessage: (chatId: string, content: string) => {
    const socket = get().socket;
    if (socket) {
      socket.emit('sendMessage', { chatId, content });
    }
  },

  setTyping: (isTyping: boolean) => {
    const socket = get().socket;
    if (socket) {
      socket.emit('typing', { chatId: 'currentChatId', isTyping });
    }
  }
}));
