import type { Project } from './project';

export interface Production {
  id: string;
  type: string;
  cost: number;
  startDate?: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  project?: Project;
}

export type CreateProductionData = {
  type: string;
  cost: number;
  startDate?: string;
  endDate?: string;
  notes?: string;
  projectId: string; // Assumindo relação
};
