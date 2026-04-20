import type { InputHTMLAttributes } from "react";
import React from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, multiline, style, ...props }, ref) => {
    const inputStyle: React.CSSProperties = {
      padding: '0.75rem 1rem',
      borderRadius: 'var(--radius-md)',
      border: `1px solid ${error ? 'var(--danger-color)' : 'var(--border-color)'}`,
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      color: 'var(--text-main)',
      outline: 'none',
      transition: 'all 0.3s ease',
      width: '100%',
      ...style,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
        {label && <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</label>}
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
            onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger-color)' : 'var(--border-color)'}
            {...(props as any)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
            onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger-color)' : 'var(--border-color)'}
            {...props}
          />
        )}
        {error && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{error}</span>}
      </div>
    );
  }
);
