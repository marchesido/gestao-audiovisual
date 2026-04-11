import type { Project } from './project';
import type { Equipment } from './equipment';

export interface ProjectEquipment {
  id: string;
  quantity: number;
  usageDate: string;
  customDailyCost?: number;
  createdAt: string;
  projectId: string;
  equipmentId: string;
  project?: Project;
  equipment?: Equipment;
}

export type CreateProjectEquipmentData = {
  quantity: number;
  usageDate: string;
  customDailyCost?: number;
  projectId: string;
  equipmentId: string;
};
