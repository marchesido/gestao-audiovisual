import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser } from '../../services/userService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Pencil, X } from 'lucide-react';

export const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const u = JSON.parse(userStr);
      if (u.role === 'ADMIN') {
        setIsAdmin(true);
        loadUsers();
      }
    }
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    setIsLoading(true);
    try {
      if (editingUserId) {
        const payload: any = { name, email, role };
        if (password) payload.password = password;
        await updateUser(editingUserId, payload);
        alert('Usuário atualizado com sucesso!');
        resetForm();
      } else {
        await createUser({ name, email, password, role });
        alert('Usuário criado com sucesso!');
        resetForm();
      }
      loadUsers();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Erro ao salvar usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingUserId(null);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('USER');
  };

  const handleEditClick = (user: any) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setPassword('');
    setConfirmPassword('');
  };

  if (!isAdmin) {
    return <div style={{ color: '#ef4444' }}>Acesso não autorizado. Apenas administradores podem gerenciar usuários.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Gerenciamento de Usuários</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Crie e visualize usuários do sistema.</p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        {/* Formulário de Criação */}
        <form onSubmit={handleSave} style={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          backgroundColor: 'var(--surface-color)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          flex: '1 1 300px',
          maxWidth: '500px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>
              {editingUserId ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>
            {editingUserId && (
              <Button type="button" variant="danger" onClick={resetForm} style={{ padding: '0.5rem' }}>
                <X size={16} />
              </Button>
            )}
          </div>

          <Input 
            label="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <Input 
            label="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Input 
            label={editingUserId ? "Nova Senha (opcional)" : "Senha Inicial"}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={!editingUserId}
            minLength={6}
          />

          <Input 
            label="Confirmação de Senha"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required={!editingUserId || password.length > 0}
            minLength={6}
          />

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

          <Button type="submit" isLoading={isLoading} style={{ marginTop: '0.5rem' }}>
            {editingUserId ? <Pencil size={20} /> : <Plus size={20} />} 
            {editingUserId ? 'Salvar Alterações' : 'Criar Usuário'}
          </Button>
        </form>

        {/* Lista de Usuários */}
        <div style={{
          backgroundColor: 'var(--surface-color)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          flex: '2 1 400px'
        }}>
          <h2 style={{ fontSize: '1.25rem', margin: '0 0 1.5rem 0' }}>Usuários Cadastrados</h2>
          
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
                      onClick={() => handleEditClick(u)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-color)',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                      title="Editar Usuário"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
