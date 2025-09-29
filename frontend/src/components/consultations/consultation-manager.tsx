"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToothChart } from "@/components/dental/tooth-chart";
import { useState, useEffect } from 'react';

interface ConsultationManagerProps {
  consultation: any;
  onClose: () => void;
  onUpdateConsultation: (updatedConsultation: any) => void;
}

export function ConsultationManager({ consultation, onClose, onUpdateConsultation }: ConsultationManagerProps) {
  const [currentConsultation, setCurrentConsultation] = useState(consultation);
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([]);

  useEffect(() => {
    setCurrentConsultation(consultation);
    if (consultation.teeth) {
      setSelectedTeeth(consultation.teeth.split(',').map((t: string) => t.trim()));
    }
  }, [consultation]);

  const handleToothSelect = (tooth: string) => {
    const newSelectedTeeth = selectedTeeth.includes(tooth)
      ? selectedTeeth.filter(t => t !== tooth)
      : [...selectedTeeth, tooth];

    setSelectedTeeth(newSelectedTeeth);
    setCurrentConsultation({ ...currentConsultation, teeth: newSelectedTeeth.join(', ') });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCurrentConsultation({
      ...currentConsultation,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onUpdateConsultation(currentConsultation);
  };

  const handleFinishConsultation = () => {
    onUpdateConsultation({ ...currentConsultation, status: 'Concluída' });
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Atendimento: {currentConsultation.patient}</h1>
        <Button onClick={onClose} variant="outline">Voltar à Lista</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Odontograma</CardTitle></CardHeader>
            <CardContent>
              <ToothChart selectedTeeth={selectedTeeth} onToothSelect={handleToothSelect} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Detalhes do Atendimento</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Procedimentos (separados por vírgula)</label>
                  <input
                    type="text"
                    name="procedures"
                    value={currentConsultation.procedures.join(', ')}
                    onChange={(e) => setCurrentConsultation({ ...currentConsultation, procedures: e.target.value.split(',').map(p => p.trim()) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dente(s)</label>
                  <input
                    type="text"
                    name="teeth"
                    value={currentConsultation.teeth}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly // Make this readonly to reflect selection from chart
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <textarea
                    name="notes"
                    value={currentConsultation.notes}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button onClick={handleSave}>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Informações do Paciente</CardTitle></CardHeader>
            <CardContent>
              <p><strong>Nome:</strong> {currentConsultation.patient}</p>
              <p><strong>Data:</strong> {new Date(currentConsultation.date).toLocaleDateString('pt-BR')}</p>
              <p><strong>Hora:</strong> {currentConsultation.time}</p>
              <p><strong>Tipo:</strong> {currentConsultation.type}</p>
              <p><strong>Doutor:</strong> {currentConsultation.doctor}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Histórico Médico</CardTitle></CardHeader>
            <CardContent>
              <p>Histórico médico do paciente aqui.</p>
            </CardContent>
          </Card>
          <Button className="w-full" onClick={handleFinishConsultation}>Finalizar Atendimento</Button>
        </div>
      </div>
    </div>
  );
}
