import type { Client } from './client';
import type { Production } from './production';
import type { ProjectEquipment } from './project-equipment';

export interface Project {
  id: string;
  title: string;
  description?: string;
  budget: number;
  status: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  productions?: Production[];
  projectEquipments?: ProjectEquipment[];
}

export type CreateProjectData = {
  title: string;
  description?: string;
  budget: number;
  status?: string;
  deadline?: string;
  clientId: string; // Assumindo relação
};
