import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ProjectForm } from './Form';
import { getProjectById, updateProject } from '../../services/projectService';
import type { CreateProjectData } from '../../types/project';
import { ArrowLeft } from 'lucide-react';

export const ProjectEdit: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CreateProjectData> | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProjectById(id).then(response => {
        const raw = response.data as any; // Type workaround for relations
        setInitialData({
           ...raw,
           clientId: raw.client ? raw.client.id : raw.clientId // Se houver população no Backend
        });
      }).catch(err => {
         console.error(err);
         alert("Não foi possível carregar os dados!");
         navigate('/projects');
      });
    }
  }, [id, navigate]);

  const handleSubmit = async (data: CreateProjectData) => {
    try {
      setIsSubmitting(true);
      if (id) {
         await updateProject(id, data);
         navigate('/projects');
      }
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
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
           onClick={() => navigate('/projects')}
           style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Editar Projeto</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Ajuste escopo e orçamentos do seu projeto ativo.</p>
        </div>
      </div>

      <ProjectForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
