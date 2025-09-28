"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: any) => void;
}

export function AddPatientModal({ isOpen, onClose, onSave }: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    cpf: "",
    emergencyContact: "",
    emergencyPhone: "",
    allergies: "",
    medications: "",
    observations: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    // Criar novo paciente
    const newPatient = {
      id: Date.now(), // ID temporário
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthDate,
      address: formData.address,
      cpf: formData.cpf,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      allergies: formData.allergies,
      medications: formData.medications,
      observations: formData.observations,
      status: "Ativo",
      avatar: formData.name.split(" ").map(n => n[0]).join("").toUpperCase(),
      lastVisit: new Date().toISOString().split('T')[0]
    };

    onSave(newPatient);
    
    // Limpar formulário
    setFormData({
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      address: "",
      cpf: "",
      emergencyContact: "",
      emergencyPhone: "",
      allergies: "",
      medications: "",
      observations: ""
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Paciente">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Informações Básicas
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o nome completo"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="inline h-3 w-3 mr-1" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="inline h-3 w-3 mr-1" />
                Telefone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline h-3 w-3 mr-1" />
                Data de Nascimento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="inline h-3 w-3 mr-1" />
              Endereço
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rua, número, bairro, cidade"
            />
          </div>
        </div>

        {/* Contato de Emergência */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900">Contato de Emergência</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Contato
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome do responsável"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone de Emergência
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
        </div>

        {/* Informações Odontológicas */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900">Informações Odontológicas</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alergias
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Penicilina, Dipirona"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medicações em Uso
            </label>
            <input
              type="text"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Losartana 50mg, Metformina 850mg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Observações gerais sobre o paciente"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Paciente
          </Button>
        </div>
      </form>
    </Modal>
  );
}