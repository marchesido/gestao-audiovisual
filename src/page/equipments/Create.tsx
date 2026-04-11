import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { EquipmentForm } from './Form';
import { createEquipment } from '../../services/equipmentService';
import type { CreateEquipmentData } from '../../types/equipment';
import { ArrowLeft } from 'lucide-react';

export const EquipmentCreate: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateEquipmentData) => {
    try {
      setIsSubmitting(true);
      await createEquipment(data);
      navigate('/equipments');
    } catch (error) {
      console.error("Erro ao criar equipamento:", error);
      alert("Ocorreu um erro ao salvar!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
           onClick={() => navigate('/equipments')}
           style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Novo Equipamento</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Cadastre um novo item no inventário.</p>
        </div>
      </div>

      <EquipmentForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
