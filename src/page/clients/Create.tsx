import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ClientForm } from './Form';
import { createClient } from '../../services/clientService';
import type { CreateClientData } from '../../types/client';
import { ArrowLeft } from 'lucide-react';

export const ClientCreate: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateClientData) => {
    try {
      setIsSubmitting(true);
      await createClient(data);
      navigate('/client');
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      alert("Ocorreu um erro ao salvar!");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Novo Cliente</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Cadastre um novo cliente no sistema.</p>
        </div>
      </div>

      <ClientForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};
