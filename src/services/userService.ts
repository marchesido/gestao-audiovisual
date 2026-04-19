import { api } from './api';

export const getUsers = (skip?: number, take?: number) => {
  const params = new URLSearchParams();
  if (skip !== undefined) params.append('skip', skip.toString());
  if (take !== undefined) params.append('take', take.toString());
  return api.get(`/users?${params.toString()}`);
};
export const getUser = (id: string) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post('/users', data);
export const updateUser = (id: string, data: any) => api.patch(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
