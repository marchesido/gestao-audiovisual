import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ClientForm } from './Form';
import { getClientById, updateClient } from '../../services/clientService';
import type { CreateClientData } from '../../types/client';
import { ArrowLeft } from 'lucide-react';

export const ClientEdit: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CreateClientData> | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getClientById(id).then(response => {
        setInitialData(response.data);
      }).catch(err => {
         console.error(err);
         alert("Não foi possível carregar os dados!");
         navigate('/client');
      });
    }
  }, [id, navigate]);

  const handleSubmit = async (data: CreateClientData) => {
    try {
      setIsSubmitting(true);
      if (id) {
         await updateClient(id, data);
         navigate('/client');
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
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
           onClick={() => navigate('/client')}
           style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Editar Cliente</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Atualize as informações de contato e empresariais.</p>
        </div>
      </div>

      <ClientForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
