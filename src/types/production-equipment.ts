import type { Production } from './production';
import type { Equipment } from './equipment';

export interface ProductionEquipment {
  id: string;
  quantity: number;
  usageDate: string;
  customDailyCost?: number;
  createdAt: string;
  productionId: string;
  equipmentId: string;
  production?: Production;
  equipment?: Equipment;
}

export type CreateProductionEquipmentData = {
  quantity: number;
  usageDate: string;
  customDailyCost?: number;
  productionId: string;
  equipmentId: string;
};
