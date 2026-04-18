import type { Project } from './project';
import type { ProductionEquipment } from './production-equipment';

export interface Production {
  id: string;
  type: string;
  cost: number;
  startDate?: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  project?: Project;
  productionEquipments?: ProductionEquipment[];
}

export type CreateProductionData = {
  type: string;
  cost: number;
  startDate?: string;
  endDate?: string;
  notes?: string;
  projectId: string; // Assumindo relação
  productionEquipments?: Partial<ProductionEquipment>[];
};
