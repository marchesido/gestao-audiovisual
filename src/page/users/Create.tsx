import React, { useState } from 'react';
import { createUser } from '../../services/userService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router';

export const UserCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations (reuse from previous Management.tsx)
    const validateCPF = (cpfStr: string) => {
      const cleanCpf = cpfStr.replace(/[^\d]+/g, '');
      if (cleanCpf.length !== 11 || !!cleanCpf.match(/(\d)\1{10}/)) return false;
      let v1 = 0, v2 = 0;
      for (let i = 0; i < 9; i++) v1 += parseInt(cleanCpf[i]) * (10 - i);
      v1 = ((v1 * 10) % 11) % 10;
      for (let i = 0; i < 10; i++) v2 += parseInt(cleanCpf[i]) * (11 - i);
      v2 = ((v2 * 10) % 11) % 10;
      return v1 === parseInt(cleanCpf[9]) && v2 === parseInt(cleanCpf[10]);
    };
    if (!validateCPF(cpf)) return alert('CPF inválido.');
    if (password !== confirmPassword) return alert('As senhas não coincidem!');
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[\W_]/.test(password)) {
      return alert('Senha não atende aos requisitos.');
    }
    
    setIsLoading(true);
    try {
      await createUser({ name, email, cpf, password, role });
      alert('Usuário criado com sucesso!');
      navigate('/users');
    } catch (err: any) {
      alert('Erro ao criar usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Novo Usuário</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Crie um novo usuário no sistema.</p>
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
            label="E-mail" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
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
            label="Senha Inicial" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            minLength={8}
            title="A senha deve ter no mínimo 8 dígitos, conter 1 letra maiúscula e 1 caractere especial."
          />
          <Input 
            label="Confirmação de Senha" 
            type="password" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            required 
            minLength={8}
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
            <Button type="submit" isLoading={isLoading} style={{ flex: 1 }}>Salvar</Button>
          </div>
      </form>
    </div>
  );
};
