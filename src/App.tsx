import React from 'react';
import { Users, Camera, Video, BoxSelect } from 'lucide-react';

function App() {
  const stats = [
    { label: 'Equipamentos', value: '45', icon: Camera, color: '#6366f1' },
    { label: 'Projetos', value: '12', icon: BoxSelect, color: '#8b5cf6' },
    { label: 'Produções', value: '8', icon: Video, color: '#ec4899' },
    { label: 'Clientes', value: '24', icon: Users, color: '#10b981' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Bem-vindo ao painel de Gestão Audiovisual.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} style={{ 
              backgroundColor: 'var(--surface-color)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                backgroundColor: `${stat.color}20`, 
                color: stat.color,
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex'
              }}>
                <Icon size={24} />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, margin: '0 0 0.25rem 0' }}>Total de {stat.label}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--surface-color)', 
        padding: '2rem', 
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1rem 0' }}>Atividades Recentes</h2>
        <div style={{ color: 'var(--text-muted)' }}>
          Nenhuma atividade registrada hoje. Comece adicionando novos equipamentos ou clientes!
        </div>
      </div>
    </div>
  );
}

export default App;
