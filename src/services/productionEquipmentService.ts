import { api } from "./api";
import type { ProductionEquipment, CreateProductionEquipmentData } from "../types/production-equipment";

export const getProductionEquipments = () => api.get<ProductionEquipment[]>("/production-equipments");
export const getProductionEquipmentById = (id: string) => api.get<ProductionEquipment>(`/production-equipments/${id}`);
export const createProductionEquipment = (data: CreateProductionEquipmentData) => api.post<ProductionEquipment>("/production-equipments", data);
export const updateProductionEquipment = (id: string, data: Partial<CreateProductionEquipmentData>) =>
  api.patch<ProductionEquipment>(`/production-equipments/${id}`, data);
export const deleteProductionEquipment = (id: string) => api.delete(`/production-equipments/${id}`);
