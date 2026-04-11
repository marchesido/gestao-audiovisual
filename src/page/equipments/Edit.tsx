import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { EquipmentForm } from './Form';
import { getEquipmentById, updateEquipment } from '../../services/equipmentService';
import type { CreateEquipmentData } from '../../types/equipment';
import { ArrowLeft } from 'lucide-react';

export const EquipmentEdit: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CreateEquipmentData> | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEquipmentById(id).then(response => {
        setInitialData(response.data);
      }).catch(err => {
         console.error(err);
         alert("Não foi possível carregar os dados!");
         navigate('/equipments');
      });
    }
  }, [id, navigate]);

  const handleSubmit = async (data: CreateEquipmentData) => {
    try {
      setIsSubmitting(true);
      if (id) {
         await updateEquipment(id, data);
         navigate('/equipments');
      }
    } catch (error) {
      console.error("Erro ao atualizar equipamento:", error);
      alert("Ocorreu um erro ao atualizar!");
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
           onClick={() => navigate('/equipments')}
           style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Editar Equipamento</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Atualize as informações do item.</p>
        </div>
      </div>

      <EquipmentForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
