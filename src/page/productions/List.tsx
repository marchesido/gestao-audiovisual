import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getProductions, deleteProduction } from '../../services/productionService';
import type { Production } from '../../types/production';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const ProductionList: React.FC = () => {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProductions = async () => {
    try {
      setLoading(true);
      const response = await getProductions();
      setProductions(response.data);
    } catch (error) {
      console.error("Erro ao carregar produções", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductions();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja deletar permanentemente esta etapa de produção?")) {
      try {
        await deleteProduction(id);
        loadProductions();
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    }
  };

  const columns: Column<Production>[] = [
    { header: 'Tipo / Etapa', accessor: 'type' },
    { 
      header: 'Custo', 
      accessor: (row) => `R$ ${Number(row.cost).toFixed(2)}`
    },
    { 
      header: 'Projeto', 
      accessor: (row) => row.project ? row.project.title : 'Desvinculado'
    },
    { 
      header: 'Início', 
      accessor: (row) => row.startDate ? new Date(row.startDate).toLocaleDateString('pt-BR') : '--'
    },
    { 
      header: 'Ações', 
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => navigate(`/productions/${row.id}/edit`)} 
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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Produções ativas</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Logística e custos pontuais diários referentes aos projetos.</p>
        </div>
        <Button onClick={() => navigate('/productions/create')}>
          <Plus size={20} />
          Nova Produção
        </Button>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>Carregando...</div>
      ) : (
         <Table data={productions} columns={columns} keyExtractor={(row) => row.id} />
      )}
    </div>
  );
};
