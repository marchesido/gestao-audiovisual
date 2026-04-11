import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getEquipments, deleteEquipment } from '../../services/equipmentService';
import type { Equipment } from '../../types/equipment';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadEquipments = async () => {
    try {
      setLoading(true);
      const response = await getEquipments();
      setEquipments(response.data);
    } catch (error) {
      console.error("Erro ao carregar equipamentos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipments();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este equipamento?")) {
      try {
        await deleteEquipment(id);
        loadEquipments();
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    }
  };

  const columns: Column<Equipment>[] = [
    { header: 'Nome', accessor: 'name' },
    { header: 'Categoria', accessor: 'category' },
    { 
      header: 'Custo Diário', 
      accessor: (row) => `R$ ${Number(row.dailyCost).toFixed(2)}`
    },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          backgroundColor: row.status === 'available' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: row.status === 'available' ? '#4ade80' : '#f87171'
        }}>
          {row.status || 'available'}
        </span>
      ) 
    },
    { 
      header: 'Ações', 
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => navigate(`/equipments/${row.id}/edit`)} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Edit2 size={18} />
          </button>
          <button 
             onClick={() => handleDelete(row.id)} 
             style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}
             onMouseOver={(e) => e.currentTarget.style.color = 'var(--danger-color)'}
             onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Equipamentos</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gerencie o inventário de equipamentos.</p>
        </div>
        <Button onClick={() => navigate('/equipments/create')}>
          <Plus size={20} />
          Novo Equipamento
        </Button>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>Carregando...</div>
      ) : (
         <Table data={equipments} columns={columns} keyExtractor={(row) => row.id} />
      )}
    </div>
  );
};
