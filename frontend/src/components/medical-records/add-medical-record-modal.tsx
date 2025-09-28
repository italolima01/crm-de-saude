"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, AlertTriangle, Pill } from "lucide-react";

interface AddMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: any) => void;
}

export function AddMedicalRecordModal({ isOpen, onClose, onSave }: AddMedicalRecordModalProps) {
  const [formData, setFormData] = useState({
    patient: "",
    date: new Date().toISOString().split('T')[0],
    type: "Avaliação Inicial",
    chiefComplaint: "",
    historyOfPresentIllness: "",
    physicalExamination: "",
    diagnosis: "",
    treatment: "",
    medications: "",
    observations: "",
    followUp: "",
    doctor: "Dr. Carlos Dentista",
    toothChart: "",
    procedures: []
  });

  const patients = [
    "Maria Silva",
    "João Santos", 
    "Ana Costa",
    "Pedro Lima"
  ];

  const recordTypes = [
    "Consulta Inicial",
    "Retorno/Controle", 
    "Urgência Odontológica",
    "Tratamento Endodôntico",
    "Procedimento Cirúrgico",
    "Limpeza/Profilaxia",
    "Restauração",
    "Prótese",
    "Ortodontia",
    "Periodontia"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patient || !formData.chiefComplaint) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      patient: formData.patient,
      date: formData.date,
      type: formData.type,
      chiefComplaint: formData.chiefComplaint,
      historyOfPresentIllness: formData.historyOfPresentIllness,
      physicalExamination: formData.physicalExamination,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      medications: formData.medications,
      observations: formData.observations,
      followUp: formData.followUp,
      doctor: formData.doctor,
      createdAt: new Date().toISOString()
    };

    onSave(newRecord);
    
    // Limpar formulário
    setFormData({
      patient: "",
      date: new Date().toISOString().split('T')[0],
      type: "Avaliação Inicial",
      chiefComplaint: "",
      historyOfPresentIllness: "",
      physicalExamination: "",
      diagnosis: "",
      treatment: "",
      medications: "",
      observations: "",
      followUp: "",
      doctor: "Dra. Maria Santos"
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
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Registro Odontológico">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Informações Básicas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline h-3 w-3 mr-1" />
                Data
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
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
                {recordTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dentista Responsável
              </label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🦷 Dente(s) Envolvido(s)
              </label>
              <input
                type="text"
                name="toothChart"
                value={formData.toothChart}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 36, 11-21, todos os molares"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🔧 Procedimentos Realizados
              </label>
              <input
                type="text"
                name="procedures"
                value={formData.procedures}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Radiografia, Anestesia, Restauração"
              />
            </div>
          </div>
        </div>

        {/* Anamnese */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900">📋 Anamnese</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Queixa Principal *
            </label>
            <textarea
              name="chiefComplaint"
              value={formData.chiefComplaint}
              onChange={handleChange}
              required
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva a queixa principal do paciente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              História Odontológica Atual
            </label>
            <textarea
              name="historyOfPresentIllness"
              value={formData.historyOfPresentIllness}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva a evolução dos sintomas odontológicos"
            />
          </div>
        </div>

        {/* Exame Físico */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900">🔍 Exame Clínico</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exame Clínico Intraoral
            </label>
            <textarea
              name="physicalExamination"
              value={formData.physicalExamination}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Dente 36 com cárie oclusal extensa, teste de percussão positivo, gengiva edemaciada..."
            />
          </div>
        </div>

        {/* Diagnóstico e Tratamento */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900">🩺 Diagnóstico e Tratamento</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnóstico
            </label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: K02.1 - Cárie dentária da dentina (Dente 36)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plano de Tratamento
            </label>
            <textarea
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Tratamento endodôntico, restauração com resina composta, orientações de higiene"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Pill className="inline h-3 w-3 mr-1" />
              Medicações Prescritas
            </label>
            <textarea
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Ibuprofeno 600mg - 1 cp de 8/8h por 3 dias"
            />
          </div>
        </div>

        {/* Observações e Seguimento */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900">📝 Observações</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações Gerais
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Observações adicionais"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seguimento
            </label>
            <input
              type="text"
              name="followUp"
              value={formData.followUp}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Retorno em 7 dias para continuidade do tratamento endodôntico"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Prontuário
          </Button>
        </div>
      </form>
    </Modal>
  );
}