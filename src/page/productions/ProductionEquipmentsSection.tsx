import React, { useState, useEffect } from 'react';
import { getEquipments } from '../../services/equipmentService';
import type { ProductionEquipment } from '../../types/production-equipment';
import type { Equipment } from '../../types/equipment';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';

interface ProductionEquipmentsSectionProps {
  productionEquipments: Partial<ProductionEquipment>[];
  onChange: (equipments: Partial<ProductionEquipment>[]) => void;
}

export const ProductionEquipmentsSection: React.FC<ProductionEquipmentsSectionProps> = ({ productionEquipments, onChange }) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  
  const [equipmentId, setEquipmentId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [usageDate, setUsageDate] = useState('');
  const [customDailyCost, setCustomDailyCost] = useState<number | ''>('');

  useEffect(() => {
    getEquipments()
      .then(eqRes => {
        setEquipments(eqRes.data);
      })
      .catch(err => console.error("Error fetching equipments:", err));
  }, []);

  const handleAdd = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    if (!equipmentId || !usageDate) {
      alert("Equipamento e Data de Uso são obrigatórios.");
      return;
    }
    
    const equipment = equipments.find(eq => eq.id === equipmentId);

    const newEquipment: Partial<ProductionEquipment> = {
      equipmentId,
      equipment,
      quantity,
      usageDate,
      customDailyCost: customDailyCost === '' ? undefined : Number(customDailyCost)
    };

    onChange([...productionEquipments, newEquipment]);

    setEquipmentId('');
    setQuantity(1);
    setUsageDate('');
    setCustomDailyCost('');
  };

  const handleRemove = (index: number) => {
    if (!window.confirm("Deseja realmente remover este equipamento da produção?")) return;
    const newEquipments = [...productionEquipments];
    newEquipments.splice(index, 1);
    onChange(newEquipments);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Equipamentos da Produção</h2>
      
      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {productionEquipments.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Nenhum equipamento vinculado a esta produção ainda.</p>
        ) : (
          productionEquipments.map((pe, index) => {
            const dateStr = pe.usageDate?.includes('T') ? pe.usageDate : `${pe.usageDate}T00:00:00`;
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(15, 23, 42, 0.3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 500 }}>{pe.equipment?.name || 'Equipamento ID: ' + pe.equipmentId}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Data de Uso: {new Date(dateStr).toLocaleDateString('pt-BR')} | Qtd: {pe.quantity}
                    {pe.customDailyCost ? ` | Custo de Diária: R$ ${Number(pe.customDailyCost).toFixed(2)}` : ''}
                  </p>
                </div>
                <Button variant="danger" type="button" onClick={() => handleRemove(index)} style={{ padding: '0.5rem', borderRadius: '8px' }}>
                  <Trash2 size={16} />
                </Button>
              </div>
            );
          })
        )}
      </div>

      {/* Form */}
      <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 500, margin: '0 0 1rem 0' }}>Vincular Novo Equipamento</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: '1 1 200px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Equipamento *</label>
            <select 
              value={equipmentId} 
              onChange={e => setEquipmentId(e.target.value)}
              style={{
                 padding: '0.75rem 1rem',
                 borderRadius: 'var(--radius-md)',
                 border: '1px solid var(--border-color)',
                 backgroundColor: 'rgba(15, 23, 42, 0.5)',
                 color: 'var(--text-main)',
                 outline: 'none',
                 fontFamily: 'inherit',
                 fontSize: '1rem',
                 appearance: 'auto'
              }}
            >
              <option value="" disabled>Selecione um equipamento</option>
              {equipments.map(eq => (
                 <option key={eq.id} value={eq.id}>{eq.name} - R$ {Number(eq.dailyCost).toFixed(2)}/dia</option>
              ))}
            </select>
          </div>
          
          <div style={{ flex: '1 1 100px' }}>
            <Input 
              label="Qtd *"
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            />
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <Input 
              label="Data de Uso *"
              type="date"
              value={usageDate as string}
              onChange={e => setUsageDate(e.target.value)}
            />
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <Input 
              label="Custo Personalizado"
              type="number"
              step="0.01"
              placeholder="Opcional"
              value={customDailyCost}
              onChange={e => setCustomDailyCost(e.target.value ? Number(e.target.value) : '')}
            />
          </div>

          <Button type="button" onClick={handleAdd} style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
            <Plus size={20} /> Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};
