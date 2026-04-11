import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getProjects, deleteProject } from '../../services/projectService';
import type { Project } from '../../types/project';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Erro ao carregar projetos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja expurgar este projeto? Produções associadas também serão deletadas!")) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return { bg: 'rgba(34, 197, 94, 0.2)', text: '#4ade80', label: 'Concluído' };
      case 'in_progress': return { bg: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa', label: 'Em Andamento' };
      case 'cancelled': return { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', label: 'Cancelado' };
      case 'pending':
      default: return { bg: 'rgba(250, 204, 21, 0.2)', text: '#fde047', label: 'Pendente' };
    }
  };

  const columns: Column<Project>[] = [
    { header: 'Título', accessor: 'title' },
    { 
      header: 'Cliente', 
      accessor: (row) => row.client ? row.client.name : 'Vazio'
    },
    { 
      header: 'Orçamento', 
      accessor: (row) => `R$ ${Number(row.budget).toFixed(2)}`
    },
    { 
      header: 'Prazo', 
      accessor: (row) => row.deadline ? new Date(row.deadline).toLocaleDateString('pt-BR') : 'N/A'
    },
    { 
      header: 'Status', 
      accessor: (row) => {
        const style = getStatusColor(row.status);
        return (
          <span style={{
            padding: '0.25rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: style.bg,
            color: style.text
          }}>
            {style.label}
          </span>
        );
      } 
    },
    { 
      header: 'Ações', 
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => navigate(`/projects/${row.id}/edit`)} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}
            title="Editar"
          >
            <Edit2 size={18} />
          </button>
          <button 
             onClick={() => handleDelete(row.id)} 
             style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}
             title="Excluir"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ) 
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Projetos</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gerencie e acompanhe todos os projetos rodando no estúdio.</p>
        </div>
        <Button onClick={() => navigate('/projects/create')}>
          <Plus size={20} />
          Novo Projeto
        </Button>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>Carregando...</div>
      ) : (
         <Table data={projects} columns={columns} keyExtractor={(row) => row.id} />
      )}
    </div>
  );
};
