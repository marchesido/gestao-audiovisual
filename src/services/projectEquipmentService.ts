import { api } from "./api";
import type { ProjectEquipment, CreateProjectEquipmentData } from "../types/project-equipment";

export const getProjectEquipments = () => api.get<ProjectEquipment[]>("/project-equipments");
export const getProjectEquipmentById = (id: string) => api.get<ProjectEquipment>(`/project-equipments/${id}`);
export const createProjectEquipment = (data: CreateProjectEquipmentData) => api.post<ProjectEquipment>("/project-equipments", data);
export const updateProjectEquipment = (id: string, data: Partial<CreateProjectEquipmentData>) =>
  api.patch<ProjectEquipment>(`/project-equipments/${id}`, data);
export const deleteProjectEquipment = (id: string) => api.delete(`/project-equipments/${id}`);
