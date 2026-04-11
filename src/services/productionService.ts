import { api } from "./api";
import type { Production, CreateProductionData } from "../types/production";

export const getProductions = () => api.get<Production[]>("/productions");
export const getProductionById = (id: string) => api.get<Production>(`/productions/${id}`);
export const createProduction = (data: CreateProductionData) => api.post<Production>("/productions", data);
export const updateProduction = (id: string, data: Partial<CreateProductionData>) =>
  api.patch<Production>(`/productions/${id}`, data);
export const deleteProduction = (id: string) => api.delete(`/productions/${id}`);
