"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { DollarSign, User, Calendar, CreditCard } from "lucide-react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
}

export function AddTransactionModal({ isOpen, onClose, onSave }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    patient: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    method: "Dinheiro",
    status: "Pago",
    category: "Consulta"
  });

  const patients = [
    "Maria Silva",
    "João Santos", 
    "Ana Costa",
    "Pedro Lima"
  ];

  const paymentMethods = [
    "Dinheiro",
    "Cartão de Crédito",
    "Cartão de Débito",
    "PIX",
    "Boleto",
    "Transferência"
  ];

  const categories = [
    "Consulta",
    "Exames",
    "Procedimentos",
    "Medicamentos",
    "Outros"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patient || !formData.description || !formData.amount) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      patient: formData.patient,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      method: formData.method,
      status: formData.status,
      category: formData.category
    };

    onSave(newTransaction);
    
    setFormData({
      patient: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      method: "Dinheiro",
      status: "Pago",
      category: "Consulta"
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Transação">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição *
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Consulta médica, Exames laboratoriais"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <DollarSign className="inline h-3 w-3 mr-1" />
              Valor *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0,00"
            />
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
              <CreditCard className="inline h-3 w-3 mr-1" />
              Método de Pagamento
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Pago">Pago</option>
            <option value="Pendente">Pendente</option>
            <option value="Atrasado">Atrasado</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Transação
          </Button>
        </div>
      </form>
    </Modal>
  );
}