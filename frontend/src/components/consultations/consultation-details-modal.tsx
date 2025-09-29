"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface ConsultationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: any;
}

export function ConsultationDetailsModal({ isOpen, onClose, consultation }: ConsultationDetailsModalProps) {
  if (!consultation) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalhes do Atendimento - ${consultation.patient}`}>
      <div className="space-y-4">
        <p><strong>Data:</strong> {new Date(consultation.date).toLocaleDateString('pt-BR')}</p>
        <p><strong>Hora:</strong> {consultation.time}</p>
        <p><strong>Duração:</strong> {consultation.duration}</p>
        <p><strong>Tipo:</strong> {consultation.type}</p>
        <p><strong>Status:</strong> {consultation.status}</p>
        <p><strong>Doutor:</strong> {consultation.doctor}</p>
        <p><strong>Dente(s):</strong> {consultation.teeth}</p>
        <div>
          <strong>Procedimentos:</strong>
          <ul className="list-disc list-inside">
            {consultation.procedures.map((proc: string, idx: number) => (
              <li key={idx}>{proc}</li>
            ))}
          </ul>
        </div>
        <p><strong>Notas:</strong> {consultation.notes}</p>
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
}
