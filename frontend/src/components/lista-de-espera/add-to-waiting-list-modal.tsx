"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { User, Calendar, Clock } from "lucide-react";

interface AddToWaitingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: any) => void;
}

export function AddToWaitingListModal({ isOpen, onClose, onSave }: AddToWaitingList_ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    desiredDate: "",
    desiredTime: "",
  });

  // Mocked list of patients for the dropdown
  const patients = [
    "Maria Silva",
    "João Santos",
    "Ana Costa",
    "Pedro Lima",
    "Carla Mendes",
    "Roberto Carlos",
    "Maria Bethania",
    "Gal Costa",
    "Caetano Veloso",
    "Gilberto Gil",
    "Elis Regina",
    "Tom Jobim",
    "Vinicius de Moraes",
    "Chico Buarque",
    "Nara Leão",
    "Milton Nascimento",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      onSave({ ...formData, id: Date.now() });
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setFormData({ ...formData, desiredDate: value });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (value.length > 2) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }
    setFormData({ ...formData, desiredTime: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar à Lista de Espera">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Paciente</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Desejada</label>
          <input
            type="text"
            name="desiredDate"
            value={formData.desiredDate}
            onChange={handleDateChange}
            placeholder="dd/mm/aaaa"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Horário Desejado</label>
          <input
            type="text"
            name="desiredTime"
            value={formData.desiredTime}
            onChange={handleTimeChange}
            placeholder="HH:MM"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </Modal>
  );
}
