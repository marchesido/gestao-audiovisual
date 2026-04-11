import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProjectForm } from './Form';
import { createProject } from '../../services/projectService';
import type { CreateProjectData } from '../../types/project';
import { ArrowLeft } from 'lucide-react';

export const ProjectCreate: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateProjectData) => {
    try {
      setIsSubmitting(true);
      await createProject(data);
      navigate('/projects');
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      alert("Ocorreu um erro ao salvar!");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Novo Projeto</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Vincule demandas e clientes.</p>
        </div>
      </div>

      <ProjectForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
