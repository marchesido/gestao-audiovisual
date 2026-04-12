import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getProductionEquipments, deleteProductionEquipment } from '../../services/productionEquipmentService';
import type { ProductionEquipment } from '../../types/production-equipment';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const EquipmentAllocationList: React.FC = () => {
  const [allocations, setAllocations] = useState<ProductionEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadAllocations = async () => {
    try {
      setLoading(true);
      const response = await getProductionEquipments();
      setAllocations(response.data);
    } catch (error) {
      console.error("Erro ao carregar", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllocations();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja cancelar o envio deste equipamento ao set?")) {
      try {
        await deleteProductionEquipment(id);
        loadAllocations();
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    }
  };

  const columns: Column<ProductionEquipment>[] = [
    { 
      header: 'Produção', 
      accessor: (row) => row.production ? row.production.type : '--'
    },
    { 
      header: 'Equipamento', 
      accessor: (row) => row.equipment ? row.equipment.name : '--'
    },
    { header: 'Qtd / Diárias', accessor: 'quantity' },
    { 
      header: 'Data de Uso', 
      accessor: (row) => row.usageDate ? new Date(row.usageDate).toLocaleDateString('pt-BR') : '--'
    },
    { 
      header: 'Ações', 
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => navigate(`/production-equipments/${row.id}/edit`)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} title="Editar Alocação"><Edit2 size={18} /></button>
          <button onClick={() => handleDelete(row.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} title="Excluir"><Trash2 size={18} /></button>
        </div>
      ) 
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Alocações no Set</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gerencie as requisições de equipamentos vinculados aos projetos diários.</p>
        </div>
        <Button onClick={() => navigate('/production-equipments/create')}>
          <Plus size={20} /> Nova Requisição
        </Button>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>Carregando inventário de campo...</div>
      ) : (
         <Table data={allocations} columns={columns} keyExtractor={(row) => row.id} />
      )}
    </div>
  );
};
