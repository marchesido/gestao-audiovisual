import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ProjectEquipmentForm } from './Form';
import { getProjectEquipmentById, updateProjectEquipment } from '../../services/projectEquipmentService';
import type { CreateProjectEquipmentData } from '../../types/project-equipment';
import { ArrowLeft } from 'lucide-react';

export const EquipmentAllocationEdit: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CreateProjectEquipmentData> | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProjectEquipmentById(id).then(response => {
        const raw = response.data as any;
        setInitialData({
           ...raw,
           projectId: raw.project ? raw.project.id : raw.projectId,
           equipmentId: raw.equipment ? raw.equipment.id : raw.equipmentId
        });
      }).catch(err => {
         console.error(err);
         alert("Não foi possível carregar os dados desta alocação!");
         navigate('/projects-equipments');
      });
    }
  }, [id, navigate]);

  const handleSubmit = async (data: CreateProjectEquipmentData) => {
    try {
      setIsSubmitting(true);
      if (id) {
         await updateProjectEquipment(id, data);
         navigate('/projects-equipments');
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar atualização de requisição.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialData) return <div style={{ color: 'var(--text-muted)' }}>Mapeando dados da alocação...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/projects-equipments')} style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
        <div>
           <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Editar Requisição de Equipamento</h1>
           <p style={{ color: 'var(--text-muted)', margin: 0 }}>Ajuste os valores ou as datas do envio.</p>
        </div>
      </div>
      <ProjectEquipmentForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
