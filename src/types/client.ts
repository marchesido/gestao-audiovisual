export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  company: string;
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;
}

export type CreateClientData = Omit<Client, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>;
