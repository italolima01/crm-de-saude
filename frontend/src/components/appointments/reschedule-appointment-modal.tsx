"use client";

import { useState, useEffect } from 'react';
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface RescheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointmentId: number, newDate: string, newTime: string) => void;
  appointments: any[];
}

export function RescheduleAppointmentModal({ isOpen, onClose, onSave, appointments }: RescheduleAppointmentModalProps) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | undefined>(undefined);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAppointmentId && newDate && newTime) {
      onSave(selectedAppointmentId, newDate, newTime);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reagendar Agendamento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o Agendamento</label>
          <select
            value={selectedAppointmentId}
            onChange={(e) => setSelectedAppointmentId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione um agendamento</option>
            {appointments.map(apt => (
              <option key={apt.id} value={apt.id}>
                {apt.patient} - {apt.date} {apt.time}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline h-3 w-3 mr-1" />
              Nova Data
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="inline h-3 w-3 mr-1" />
              Novo Horário
            </label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Reagendar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
