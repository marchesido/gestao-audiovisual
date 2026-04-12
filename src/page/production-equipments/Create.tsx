import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProductionEquipmentForm } from './Form';
import type { CreateProductionEquipmentData } from '../../types/production-equipment';
import { ArrowLeft } from 'lucide-react';
import { createProductionEquipment } from '../../services/productionEquipmentService';

export const EquipmentAllocationCreate: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateProductionEquipmentData) => {
    try {
      setIsSubmitting(true);
      await createProductionEquipment(data);
      navigate('/production-equipments');
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar a requisição!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/production-equipments')} style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
        <div>
           <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Sinalizar Uso de Equipamento</h1>
           <p style={{ color: 'var(--text-muted)', margin: 0 }}>Despache equipamentos do inventário direto para o campo.</p>
        </div>
      </div>
      <ProductionEquipmentForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
