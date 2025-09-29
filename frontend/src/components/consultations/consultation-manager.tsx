"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToothChart } from "@/components/dental/tooth-chart";

interface ConsultationManagerProps {
  consultation: any;
  onClose: () => void;
}

export function ConsultationManager({ consultation, onClose }: ConsultationManagerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Atendimento: {consultation.patient}</h1>
        <Button onClick={onClose} variant="outline">Voltar à Lista</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Odontograma</CardTitle></CardHeader>
            <CardContent>
              <ToothChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Detalhes do Atendimento</CardTitle></CardHeader>
            <CardContent>
              <p>Procedimentos, anotações, etc.</p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Informações do Paciente</CardTitle></CardHeader>
            <CardContent>
              <p>Nome: {consultation.patient}</p>
              <p>Data: {new Date(consultation.date).toLocaleDateString('pt-BR')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Histórico Médico</CardTitle></CardHeader>
            <CardContent>
              <p>Histórico médico do paciente aqui.</p>
            </CardContent>
          </Card>
          <Button className="w-full">Finalizar Atendimento</Button>
        </div>
      </div>
    </div>
  );
}
