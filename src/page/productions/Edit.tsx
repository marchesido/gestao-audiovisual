import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ProductionForm } from './Form';
import { getProductionById, updateProduction } from '../../services/productionService';
import type { CreateProductionData } from '../../types/production';
import { ArrowLeft } from 'lucide-react';

export const ProductionEdit: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CreateProductionData> | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProductionById(id).then(response => {
        const raw = response.data as any;
        setInitialData({
           ...raw,
           projectId: raw.project ? raw.project.id : raw.projectId // Vinculação do parent 
        });
      }).catch(err => {
         console.error(err);
         alert("Não foi possível carregar os dados!");
         navigate('/productions');
      });
    }
  }, [id, navigate]);

  const handleSubmit = async (data: CreateProductionData) => {
    try {
      setIsSubmitting(true);
      if (id) {
         await updateProduction(id, data);
         navigate('/productions');
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Ocorreu um erro ao atualizar a produção!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialData) {
      return <div style={{ color: 'var(--text-muted)' }}>Carregando dados...</div>;
  }

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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Editar Produção</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Atualize as ocorrências ou os custos da gravação.</p>
        </div>
      </div>

      <ProductionForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
