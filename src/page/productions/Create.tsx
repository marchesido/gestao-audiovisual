import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProductionForm } from './Form';
import { createProduction } from '../../services/productionService';
import type { CreateProductionData } from '../../types/production';
import { ArrowLeft } from 'lucide-react';

export const ProductionCreate: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateProductionData) => {
    try {
      setIsSubmitting(true);
      await createProduction(data);
      navigate('/productions');
    } catch (error) {
      console.error("Erro ao criar produção:", error);
      alert("Ocorreu um erro ao salvar!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
           onClick={() => navigate('/productions')}
           style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Nova Produção</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gere ocorrências e relatórios sob o guarda-chuva de um projeto.</p>
        </div>
      </div>

      <ProductionForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
