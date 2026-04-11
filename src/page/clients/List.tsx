import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getClients, deleteClient } from '../../services/clientService';
import type { Client } from '../../types/client';
import { Table } from '../../components/ui/Table';
import type { Column } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadClients = async () => {
    try {
      setLoading(true);
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao carregar clientes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este cliente? Toda a relação dele com projetos será afetada!")) {
      try {
        await deleteClient(id);
        loadClients();
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    }
  };

  const columns: Column<Client>[] = [
    { header: 'Nome', accessor: 'name' },
    { header: 'E-mail', accessor: 'email' },
    { header: 'Empresa', accessor: 'company' },
    { header: 'Telefone', accessor: 'phone' },
    { header: 'CPF', accessor: 'cpf' },
    { 
      header: 'Ações', 
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => navigate(`/client/${row.id}/edit`)} 
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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Clientes</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gerencie a carteira de clientes do aplicativo.</p>
        </div>
        <Button onClick={() => navigate('/client/create')}>
          <Plus size={20} />
          Novo Cliente
        </Button>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>Carregando...</div>
      ) : (
         <Table data={clients} columns={columns} keyExtractor={(row) => row.id} />
      )}
    </div>
  );
};
