export interface Equipment {
  id: string;
  name: string;
  category: string;
  serialNumber?: string;
  purchaseDate?: string;
  status: string;
  dailyCost: number;
  createdAt: string;
}

export type CreateEquipmentData = Omit<Equipment, 'id' | 'createdAt'>;
