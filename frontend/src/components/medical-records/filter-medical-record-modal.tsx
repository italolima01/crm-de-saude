'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface FilterMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export function FilterMedicalRecordModal({ isOpen, onClose, onApply }: FilterMedicalRecordModalProps) {
  const [status, setStatus] = useState('');
  const [hasAllergies, setHasAllergies] = useState('');

  const handleApply = () => {
    onApply({ status, hasAllergies });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtrar Registros">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          >
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Alergias</label>
          <select
            value={hasAllergies}
            onChange={(e) => setHasAllergies(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          >
            <option value="">Todos</option>
            <option value="yes">Com Alergias</option>
            <option value="no">Sem Alergias</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleApply}>Aplicar Filtros</Button>
        </div>
      </div>
    </Modal>
  );
}
