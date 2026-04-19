import React, { useState, useEffect } from 'react';
import { getProfile, logout } from '../../services/authService';
import { updateUser } from '../../services/userService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
      setName(data.name || '');
    } catch (err) {
      console.error(err);
      if ((err as any).response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload: any = { name };
      if (password) payload.password = password;
      await updateUser(user.id, payload);
      alert('Perfil atualizado com sucesso!');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar perfil.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <div style={{ color: 'var(--text-muted)' }}>Carregando perfil...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Meu Perfil</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gerencie suas informações pessoais.</p>
      </div>

      <form onSubmit={handleUpdate} style={{
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        backgroundColor: 'var(--surface-color)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
      }}>
        
        <Input 
          label="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>E-mail (Não editável)</label>
          <input 
            value={user.email}
            disabled
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'rgba(15, 23, 42, 0.2)',
              color: 'var(--text-muted)',
              cursor: 'not-allowed'
            }}
          />
        </div>

        <Input 
          label="Nova Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Deixe em branco para não alterar"
        />

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
          <Button type="submit" isLoading={isLoading}>
            Atualizar Perfil
          </Button>
        </div>
      </form>
    </div>
  );
};
