"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface StartConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (patient: any) => void;
  appointments: any[];
}

export function StartConsultationModal({ isOpen, onClose, onStart, appointments }: StartConsultationModalProps) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAppointmentId) {
      const appointment = appointments.find(apt => apt.id === Number(selectedAppointmentId));
      if (appointment) {
        onStart(appointment);
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Iniciar Atendimento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o Paciente</label>
          <select
            value={selectedAppointmentId}
            onChange={(e) => setSelectedAppointmentId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione um paciente da agenda de hoje</option>
            {appointments.map(apt => (
              <option key={apt.id} value={apt.id}>
                {apt.patient} - {apt.time}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Iniciar</Button>
        </div>
      </form>
    </Modal>
  );
}
