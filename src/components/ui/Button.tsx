import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', isLoading, children, style, ...props }) => {
  const baseStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontWeight: 600,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: props.disabled ? 0.6 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'danger':
        return { backgroundColor: 'var(--danger-color)', color: '#fff' };
      case 'secondary':
         return { backgroundColor: 'var(--surface-color)', color: 'var(--text-main)', border: '1px solid var(--border-color)' };
      case 'primary':
      default:
        return { backgroundColor: 'var(--primary-color)', color: '#fff', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.4)' };
    }
  };

  return (
    <button 
      style={{ ...baseStyle, ...getVariantStyle(), ...style }} 
      {...props}
      onMouseOver={(e) => {
        if (!props.disabled) {
            e.currentTarget.style.filter = 'brightness(1.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseOut={(e) => {
        if (!props.disabled) {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {isLoading ? <span>Carregando...</span> : children}
    </button>
  );
};
