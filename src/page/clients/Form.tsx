import React, { useState } from 'react';
import type { CreateClientData } from '../../types/client';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface ClientFormProps {
  initialData?: Partial<CreateClientData>;
  onSubmit: (data: CreateClientData) => Promise<void>;
  isLoading?: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<CreateClientData>>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    cpf: initialData?.cpf || '',
    company: initialData?.company || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.cpf) return;
    onSubmit(formData as CreateClientData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem',
      backgroundColor: 'var(--surface-color)',
      padding: '2rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      maxWidth: '600px'
    }}>
      <Input 
        label="Nome Completo *"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="João da Silva"
      />
      
      <Input 
        label="E-mail *"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="joao@exemplo.com"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input 
          label="CPF *"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
          placeholder="000.000.000-00"
        />

        <Input 
          label="Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="(11) 99999-9999"
        />
      </div>

      <Input 
        label="Empresa"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
        placeholder="TechCorp"
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button type="submit" isLoading={isLoading}>
          Salvar Cliente
        </Button>
      </div>
    </form>
  );
};
