import React, { useState, useEffect } from 'react';
import type { CreateProjectEquipmentData } from '../../types/project-equipment';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { getProjects } from '../../services/projectService';
import type { Project } from '../../types/project';

import { getEquipments } from '../../services/equipmentService';
import type { Equipment } from '../../types/equipment';

interface FormProps {
  initialData?: Partial<CreateProjectEquipmentData>;
  onSubmit: (data: CreateProjectEquipmentData) => Promise<void>;
  isLoading?: boolean;
}

export const ProjectEquipmentForm: React.FC<FormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<CreateProjectEquipmentData>>({
    projectId: initialData?.projectId || '',
    equipmentId: initialData?.equipmentId || '',
    quantity: initialData?.quantity || 1,
    usageDate: initialData?.usageDate ? new Date(initialData.usageDate).toISOString().split('T')[0] : '',
    customDailyCost: initialData?.customDailyCost || 0,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data)).catch(console.error);
    getEquipments().then(res => setEquipments(res.data)).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'quantity' || name === 'customDailyCost') ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectId || !formData.equipmentId) {
      alert("A seleção de Projeto e Equipamento são essenciais.");
      return;
    }

    const { usageDate, ...rest } = formData;
    onSubmit({
      ...rest,
      usageDate: usageDate ? usageDate : new Date().toISOString()
    } as CreateProjectEquipmentData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', maxWidth: '600px' }}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Projeto Vinculado *</label>
        <select name="projectId" value={formData.projectId} onChange={handleChange} required
          style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(15, 23, 42, 0.5)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem', appearance: 'auto' }}
        >
          <option value="" disabled>Selecione</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Equipamento *</label>
        <select name="equipmentId" value={formData.equipmentId} onChange={handleChange} required
          style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(15, 23, 42, 0.5)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem', textOverflow: 'ellipsis' }}
        >
          <option value="" disabled>Selecione</option>
          {equipments.map(e => <option key={e.id} value={e.id}>{e.name} (SN: {e.serialNumber || 'N/A'})</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input label="Quantidade Diárias/Unidades *" name="quantity" type="number" step="1" value={formData.quantity} onChange={handleChange} required />
        <Input label="Data Inicial de Uso" name="usageDate" type="date" value={formData.usageDate as string} onChange={handleChange} />
      </div>

      <Input label="Custo Sublocação (R$ Custódia)" name="customDailyCost" type="number" step="0.01" value={formData.customDailyCost} onChange={handleChange} placeholder="Opcional. Valor acertado." />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button type="submit" isLoading={isLoading}>Concluir Alocação</Button>
      </div>
    </form>
  );
};
