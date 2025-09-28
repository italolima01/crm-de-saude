"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Calendar, Clock, User, FileText, AlertCircle } from "lucide-react";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  appointment?: any;
}

export function AppointmentForm({ isOpen, onClose, onSubmit, appointment }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientId: appointment?.patientId || "",
    patientName: appointment?.patientName || "",
    date: appointment?.date || "",
    time: appointment?.time || "",
    duration: appointment?.duration || "60",
    type: appointment?.type || "consulta",
    doctor: appointment?.doctor || "Dr. João Silva",
    notes: appointment?.notes || "",
    priority: appointment?.priority || "normal",
  });

  const appointmentTypes = [
    { value: "consulta", label: "Consulta" },
    { value: "retorno", label: "Retorno" },
    { value: "primeira-consulta", label: "Primeira Consulta" },
    { value: "emergencia", label: "Emergência" },
    { value: "exame", label: "Exame" },
  ];

  const priorities = [
    { value: "baixa", label: "Baixa", color: "text-green-600" },
    { value: "normal", label: "Normal", color: "text-blue-600" },
    { value: "alta", label: "Alta", color: "text-orange-600" },
    { value: "urgente", label: "Urgente", color: "text-red-600" },
  ];

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={appointment ? "Editar Agendamento" : "Novo Agendamento"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações do Paciente */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="mr-2 h-5 w-5" />
            Paciente
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecionar Paciente *
              </label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione um paciente</option>
                <option value="1">Maria Silva</option>
                <option value="2">João Santos</option>
                <option value="3">Ana Costa</option>
                <option value="4">Pedro Lima</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ou digite o nome
              </label>
              <Input
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Nome do paciente"
              />
            </div>
          </div>
        </div>

        {/* Data e Horário */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Data e Horário
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data *
              </label>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Horário *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione o horário</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duração (min)
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
                <option value="120">120 minutos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Detalhes da Consulta */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Detalhes da Consulta
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consulta *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {appointmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Médico Responsável
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Dr. João Silva">Dr. João Silva</option>
                <option value="Dra. Maria Santos">Dra. Maria Santos</option>
                <option value="Dr. Pedro Costa">Dr. Pedro Costa</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <AlertCircle className="inline h-4 w-4 mr-1" />
                Prioridade
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Observações adicionais sobre a consulta"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {appointment ? "Atualizar" : "Agendar"} Consulta
          </Button>
        </div>
      </form>
    </Modal>
  );
}