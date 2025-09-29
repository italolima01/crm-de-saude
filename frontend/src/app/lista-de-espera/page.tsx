"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddToWaitingListModal } from "@/components/lista-de-espera/add-to-waiting-list-modal";
import { User, Plus, Trash2 } from "lucide-react";

export default function WaitingListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitingList, setWaitingList] = useState([
    { id: 1, name: "João da Silva", desiredDate: "Qualquer data", desiredTime: "Manhã" },
    { id: 2, name: "Maria Oliveira", desiredDate: "2025-10-15", desiredTime: "Tarde" },
    { id: 3, name: "Pedro Souza", desiredDate: "Finais de semana", desiredTime: "Qualquer horário" },
  ]);

  const handleAddToWaitingList = (patient: any) => {
    setWaitingList([...waitingList, patient]);
  };

  const handleRemoveFromWaitingList = (patientId: number) => {
    setWaitingList(waitingList.filter(p => p.id !== patientId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Lista de Espera</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar à Lista
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pacientes na Lista de Espera</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waitingList.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <User className="h-8 w-8 text-gray-500" />
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">Data desejada: {patient.desiredDate}</p>
                    <p className="text-sm text-gray-600">Horário desejado: {patient.desiredTime}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveFromWaitingList(patient.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddToWaitingListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddToWaitingList}
      />
    </div>
  );
}
