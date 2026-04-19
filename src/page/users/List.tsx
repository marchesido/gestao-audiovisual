import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/userService';
import { Button } from '../../components/ui/Button';
import { Plus, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const take = 10;
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [skip]);

  const loadUsers = async () => {
    try {
      const res = await getUsers(skip, take);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Usuários</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gerencie os usuários do sistema.</p>
        </div>
        <Button onClick={() => navigate('/users/new')}>
          <Plus size={20} /> Novo Usuário
        </Button>
      </div>

      <div style={{
        backgroundColor: 'var(--surface-color)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {users.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Nenhum usuário encontrado.</p>
          ) : (
            users.map(u => (
              <div key={u.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'rgba(15, 23, 42, 0.3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{u.name}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{u.email}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    backgroundColor: u.role === 'ADMIN' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                    color: u.role === 'ADMIN' ? '#60a5fa' : '#94a3b8'
                  }}>
                    {u.role}
                  </span>
                  <button 
                    onClick={() => navigate(`/users/${u.id}/edit`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary-color)',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>
          <Button onClick={() => setSkip(s => Math.max(0, s - take))} disabled={skip === 0} variant="secondary">
             <ChevronLeft size={20} /> Anterior
          </Button>
          <span style={{ color: 'var(--text-muted)' }}>Página {Math.floor(skip/take) + 1}</span>
          <Button onClick={() => setSkip(s => s + take)} disabled={users.length < take} variant="secondary">
             Próxima <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
