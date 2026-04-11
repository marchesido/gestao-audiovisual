import React, { useState, useEffect } from 'react';
import type { CreateProjectData } from '../../types/project';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { getClients } from '../../services/clientService';
import type { Client } from '../../types/client';

interface ProjectFormProps {
  initialData?: Partial<CreateProjectData>;
  onSubmit: (data: CreateProjectData) => Promise<void>;
  isLoading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<CreateProjectData>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    budget: initialData?.budget || 0,
    status: initialData?.status || 'pending',
    deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
    clientId: initialData?.clientId || '',
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getClients().then(res => setClients(res.data)).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'budget' ? parseFloat(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.clientId) {
      alert("Título e Cliente são obrigatórios.");
      return;
    }

    // Parse deadline or remove if empty
    const submissionData = { ...formData };
    if (!submissionData.deadline) {
       delete submissionData.deadline;
    }

    onSubmit(submissionData as CreateProjectData);
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
        label="Título do Projeto *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Ex: Comercial Coca-Cola"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Cliente Vinculado *</label>
        <select 
          name="clientId" 
          value={formData.clientId} 
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
          <option value="" disabled>Selecione um cliente</option>
          {clients.map(client => (
             <option key={client.id} value={client.id}>{client.name} ({client.company})</option>
          ))}
        </select>
      </div>

      <Input 
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        placeholder="Detalhes adicionais sobre escopo e objetivos..."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input 
          label="Orçamento (R$)"
          name="budget"
          type="number"
          step="0.01"
          value={formData.budget}
          onChange={handleChange}
          placeholder="0.00"
        />

        <Input 
          label="Prazo (Deadline)"
          name="deadline"
          type="date"
          value={formData.deadline as string}
          onChange={handleChange}
        />
      </div>

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
          <option value="pending">Pendente</option>
          <option value="in_progress">Em Andamento</option>
          <option value="completed">Concluído</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button type="submit" isLoading={isLoading}>
          Salvar Projeto
        </Button>
      </div>
    </form>
  );
};
