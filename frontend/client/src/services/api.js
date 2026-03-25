import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const chatAPI = {
  getChats: () => api.get('/chats'),
  getMessages: (chatId) => api.get(`/messages/${chatId}`),
  sendMessage: (data) => api.post('/messages', data),
};

export default api;
