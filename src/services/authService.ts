import { api } from './api';

export const login = async (email: string, pass: string) => {
  const response = await api.post('/auth/login', { email, password: pass });
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};
