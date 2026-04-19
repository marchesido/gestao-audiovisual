import React, { useState, useEffect } from 'react';
import { getProfile, logout } from '../../services/authService';
import { updateUser } from '../../services/userService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      setCpf(data.cpf || '');
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

    if (password && password !== confirmPassword) {
      alert('A nova senha e a confirmação não conferem.');
      setIsLoading(false);
      return;
    }

    if (password && (password.length < 8 || !/[A-Z]/.test(password) || !/[\W_]/.test(password))) {
      alert('A nova senha deve ter no mínimo 8 dígitos, conter 1 letra maiúscula e 1 caractere especial.');
      setIsLoading(false);
      return;
    }

    // CPF Validation
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
        alert('CPF inválido.');
        setIsLoading(false);
        return;
    }

    try {
      const payload: any = { name, cpf };
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

        <Input 
          label="CPF"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          required
          placeholder="000.000.000-00"
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
          minLength={8}
          title="A senha deve ter no mínimo 8 dígitos, conter 1 letra maiúscula e 1 caractere especial."
        />
        <Input 
          label="Confirmar Nova Senha"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirme a nova senha"
        />
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-0.5rem' }}>
          Requisitos da nova senha:
          <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0 }}>
            <li>Mínimo de 8 caracteres</li>
            <li>Pelo menos 1 letra maiúscula</li>
            <li>Pelo menos 1 caractere especial</li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
          <Button type="submit" isLoading={isLoading}>
            Atualizar Perfil
          </Button>
        </div>
      </form>
    </div>
  );
};
