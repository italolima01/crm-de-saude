"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, MapPin, Activity } from "lucide-react";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: any) => void;
  patient: any;
}

export function EditPatientModal({ isOpen, onClose, onSave, patient }: EditPatientModalProps) {
  const [formData, setFormData] = useState(patient);

  useEffect(() => {
    setFormData(patient);
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Paciente">
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
              value={formData?.name}
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
                value={formData?.email}
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
                value={formData?.phone}
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
                value={formData?.birthDate}
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
                value={formData?.cpf}
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
              value={formData?.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rua, número, bairro, cidade"
            />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Status do Paciente
          </h3>
          <select
            name="status"
            value={formData?.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Modal>
  );
}
