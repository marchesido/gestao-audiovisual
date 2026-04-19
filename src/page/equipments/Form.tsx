import React, { useState } from 'react';
import type { CreateEquipmentData } from '../../types/equipment';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface EquipmentFormProps {
  initialData?: Partial<CreateEquipmentData>;
  onSubmit: (data: CreateEquipmentData) => Promise<void>;
  isLoading?: boolean;
}

export const EquipmentForm: React.FC<EquipmentFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<CreateEquipmentData>>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    serialNumber: initialData?.serialNumber || '',
    status: initialData?.status || 'available',
    dailyCost: initialData?.dailyCost !== undefined ? Number(initialData.dailyCost) : 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'dailyCost' ? (value === '' ? 0 : parseFloat(value)) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;
    onSubmit(formData as CreateEquipmentData);
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
        label="Nome do Equipamento *"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Ex: Câmera Sony A7S III"
      />
      
      <Input 
        label="Categoria *"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        placeholder="Ex: Câmeras, Iluminação, etc."
      />

      <Input 
        label="Número de Série"
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
        placeholder="SN12345678"
      />

      <Input 
        label="Custo Diário (R$)"
        name="dailyCost"
        type="number"
        step="0.01"
        value={formData.dailyCost}
        onChange={handleChange}
        placeholder="150.00"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Status</label>
        <select 
          name="status" 
          value={formData.status} 
          onChange={handleChange}
          style={{
             padding: '0.75rem 1rem',
             borderRadius: 'var(--radius-md)',
             border: '1px solid var(--border-color)',
             backgroundColor: 'rgba(15, 23, 42, 0.5)',
             color: 'var(--text-main)',
             outline: 'none',
             fontFamily: 'inherit',
             fontSize: '1rem',
             appearance: 'auto'
          }}
        >
          <option value="available">Disponível</option>
          <option value="maintenance">Manutenção</option>
          <option value="in_use">Em Uso</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button type="submit" isLoading={isLoading}>
          Salvar Equipamento
        </Button>
      </div>
    </form>
  );
};
