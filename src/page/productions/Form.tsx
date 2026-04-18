import React, { useState, useEffect } from 'react';
import type { CreateProductionData } from '../../types/production';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { getProjects } from '../../services/projectService';
import type { Project } from '../../types/project';
import { ProductionEquipmentsSection } from './ProductionEquipmentsSection';

interface ProductionFormProps {
  initialData?: Partial<CreateProductionData>;
  onSubmit: (data: CreateProductionData) => Promise<void>;
  isLoading?: boolean;
}

export const ProductionForm: React.FC<ProductionFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<CreateProductionData>>({
    type: initialData?.type || '',
    cost: initialData?.cost || 0,
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
    notes: initialData?.notes || '',
    projectId: initialData?.projectId || '',
    productionEquipments: initialData?.productionEquipments || []
  });

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data)).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'cost' ? parseFloat(value) : value 
    }));
  };

  const handleEquipmentsChange = (equipments: any[]) => {
    // Only keep necessary fields to avoid sending full equipment object to backend
    const cleanEquipments = equipments.map(eq => ({
      equipmentId: eq.equipmentId,
      quantity: eq.quantity,
      usageDate: eq.usageDate,
      customDailyCost: eq.customDailyCost,
      equipment: eq.equipment // Keep it for display
    }));

    setFormData(prev => ({
      ...prev,
      productionEquipments: cleanEquipments
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.projectId) {
      alert("Tipo e Projeto vinculado são obrigatórios.");
      return;
    }

    const submissionData = { ...formData };
    if (!submissionData.startDate) delete submissionData.startDate;
    if (!submissionData.endDate) delete submissionData.endDate;

    // Remove the nested 'equipment' object right before submit
    const apiPayload = {
      ...submissionData,
      productionEquipments: submissionData.productionEquipments?.map(pe => ({
        equipmentId: pe.equipmentId,
        quantity: pe.quantity,
        usageDate: pe.usageDate,
        customDailyCost: pe.customDailyCost
      }))
    } as CreateProductionData;

    onSubmit(apiPayload);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
          label="Tipo de Produção *"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          placeholder="Ex: Diária de Gravação Externa"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Projeto Vinculado *</label>
          <select 
            name="projectId" 
            value={formData.projectId} 
            onChange={handleChange}
            required
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
            <option value="" disabled>Selecione um projeto pai</option>
            {projects.map(project => (
               <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
        </div>

        <Input 
          label="Custo Executivo (R$)"
          name="cost"
          type="number"
          step="0.01"
          value={formData.cost}
          onChange={handleChange}
          placeholder="0.00"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input 
            label="Data Fática de Início"
            name="startDate"
            type="date"
            value={formData.startDate as string}
            onChange={handleChange}
          />

          <Input 
            label="Data Finalização"
            name="endDate"
            type="date"
            value={formData.endDate as string}
            onChange={handleChange}
          />
        </div>

        <Input 
          label="Notas de Produção"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          placeholder="Detalhes de campo, imprevistos ou logs diários..."
        />

      </form>
      
      <ProductionEquipmentsSection 
        productionEquipments={formData.productionEquipments || []} 
        onChange={handleEquipmentsChange} 
      />

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
        <Button onClick={handleSubmit} isLoading={isLoading}>
          Salvar Produção
        </Button>
      </div>
    </div>
  );
};
