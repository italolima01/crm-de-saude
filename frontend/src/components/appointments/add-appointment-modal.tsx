"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Calendar, Clock, User, FileText } from "lucide-react";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: any) => void;
  doctors: any[];
  date?: string;
  time?: string;
}

export function AddAppointmentModal({ isOpen, onClose, onSave, doctors, date, time }: AddAppointmentModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    patient: "",
    date: date || "",
    time: time || "",
    duration: "60",
    type: "Avaliação Inicial",
    doctor: user?.role === 'medico' ? user.name : "",
    notes: ""
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: date || "",
      time: time || "",
      doctor: user?.role === 'medico' ? user.name : ""
    }));
  }, [date, time, user]);

  const patients = [
    "Maria Silva",
    "João Santos", 
    "Ana Costa",
    "Pedro Lima"
  ];

  const appointmentTypes = [
    "Avaliação Inicial",
    "Limpeza e Profilaxia", 
    "Restauração",
    "Tratamento de Canal",
    "Extração",
    "Cirurgia Oral",
    "Ortodontia",
    "Prótese",
    "Periodontia",
    "Urgência Odontológica",
    "Retorno/Controle"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patient || !formData.date || !formData.time) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patient: formData.patient,
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration),
      type: formData.type,
      status: "Aguardando",
      doctor: formData.doctor,
      notes: formData.notes
    };

    onSave(newAppointment);
    
    setFormData({
      patient: "",
      date: "",
      time: "",
      duration: "60",
      type: "Consulta",
      doctor: user?.role === 'medico' ? user.name : "",
      notes: ""
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Agendamento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="inline h-3 w-3 mr-1" />
            Paciente *
          </label>
          <select
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione um paciente</option>
            {patients.map((patient) => (
              <option key={patient} value={patient}>{patient}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline h-3 w-3 mr-1" />
              Data *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="inline h-3 w-3 mr-1" />
              Horário *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Atendimento
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {appointmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duração (minutos)
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60">60 minutos</option>
              <option value="90">90 minutos</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dentista Responsável
          </label>
          {user?.role === 'medico' ? (
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          ) : (
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione um dentista</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline h-3 w-3 mr-1" />
            Observações
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Observações sobre o agendamento"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Agendar Atendimento
          </Button>
        </div>
      </form>
    </Modal>
  );
}