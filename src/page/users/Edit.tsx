import React, { useState, useEffect } from 'react';
import { updateUser, getUsers } from '../../services/userService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate, useParams } from 'react-router';

export const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app we'd fetch the specific user or have getProfileById
    // Here we have to fetch all to find by ID
    getUsers().then(res => {
      const u = res.data.find((user: any) => user.id === id);
      if (u) {
        setName(u.name);
        setCpf(u.cpf || '');
        setRole(u.role);
      }
    });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password && password !== confirmPassword) return alert('Senhas não coincidem');
    if (password && (password.length < 8 || !/[A-Z]/.test(password) || !/[\W_]/.test(password))) {
      return alert('Senha não atende aos requisitos.');
    }
    
    setIsLoading(true);
    try {
      const payload: any = { name, cpf, role };
      if (password) payload.password = password;
      await updateUser(id!, payload);
      alert('Usuário atualizado!');
      navigate('/users');
    } catch (err: any) {
      alert('Erro ao atualizar usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Editar Usuário</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Atualize as informações do usuário no sistema.</p>
      </div>
      
      <form onSubmit={handleSave} style={{
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        backgroundColor: 'var(--surface-color)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        maxWidth: '500px'
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
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, '');
              if (v.length > 11) v = v.substring(0, 11);
              v = v.replace(/(\d{3})(\d)/, '$1.$2');
              v = v.replace(/(\d{3})(\d)/, '$1.$2');
              v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
              setCpf(v);
            }} 
            required 
            placeholder="000.000.000-00"
          />
          <Input 
            label="Nova Senha (opcional)" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            minLength={8}
            title="A senha deve ter no mínimo 8 dígitos, conter 1 letra maiúscula e 1 caractere especial."
          />
          <Input 
            label="Confirmação de Senha" 
            type="password" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            minLength={8}
            required={password.length > 0}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
            Requisitos da senha:
            <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0 }}>
              <li>Mínimo de 8 caracteres</li>
              <li>Pelo menos 1 letra maiúscula</li>
              <li>Pelo menos 1 caractere especial</li>
            </ul>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Perfil</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)}
              style={{
                 padding: '0.75rem 1rem',
                 borderRadius: 'var(--radius-md)',
                 border: '1px solid var(--border-color)',
                 backgroundColor: 'rgba(15, 23, 42, 0.5)',
                 color: 'var(--text-main)',
                 outline: 'none'
              }}
            >
               <option value="USER">Usuário Padrão</option>
               <option value="ADMIN">Administrador</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <Button onClick={() => navigate('/users')} type="button" variant="secondary" style={{ flex: 1 }}>Cancelar</Button>
            <Button type="submit" isLoading={isLoading} style={{ flex: 1 }}>Salvar Alterações</Button>
          </div>
      </form>
    </div>
  );
};
