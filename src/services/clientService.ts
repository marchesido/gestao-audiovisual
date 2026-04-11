import { api } from "./api";
import type { Client, CreateClientData } from "../types/client";

export const getClients = () => api.get<Client[]>("/clients");
export const getClientById = (id: string) => api.get<Client>(`/clients/${id}`);
export const createClient = (data: CreateClientData) => api.post<Client>("/clients", data);
export const updateClient = (id: string, data: Partial<CreateClientData>) =>
  api.patch<Client>(`/clients/${id}`, data);
export const deleteClient = (id: string) => api.delete(`/clients/${id}`);
