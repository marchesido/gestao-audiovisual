import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
}

export function Table<T>({ data, columns, keyExtractor }: TableProps<T>) {
  return (
    <div style={{ 
      overflowX: 'auto', 
      backgroundColor: 'var(--surface-color)', 
      borderRadius: 'var(--radius-lg)', 
      border: '1px solid var(--border-color)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr 
                key={keyExtractor(row)} 
                style={{ 
                  transition: 'background-color 0.2s',
                  backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
              >
                {columns.map((col, i) => (
                  <td key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
