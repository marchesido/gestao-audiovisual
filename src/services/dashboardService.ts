import { api } from "./api";


export interface DashboardStats {
  clients: number;
  projects: number;
  productions: number;
  equipments: number;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
};
