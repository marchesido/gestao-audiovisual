import { api } from "./api";
import type { Equipment, CreateEquipmentData } from "../types/equipment";

export const getEquipments = () => api.get<Equipment[]>("/equipments");
export const getEquipmentById = (id: string) => api.get<Equipment>(`/equipments/${id}`);
export const createEquipment = (data: CreateEquipmentData) => api.post<Equipment>("/equipments", data);
export const updateEquipment = (id: string, data: Partial<CreateEquipmentData>) =>
  api.patch<Equipment>(`/equipments/${id}`, data);
export const deleteEquipment = (id: string) => api.delete(`/equipments/${id}`);
export const patchEquipment = (id: string, data: Partial<CreateEquipmentData>) =>
  api.patch<Equipment>(`/equipments/${id}`, data);
