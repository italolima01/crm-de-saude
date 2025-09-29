"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { StartConsultationModal } from "@/components/consultations/start-consultation-modal";
import { ConsultationDetailsModal } from "@/components/consultations/consultation-details-modal";
import { ConsultationManager } from "@/components/consultations/consultation-manager";
import { EditConsultationModal } from "@/components/consultations/edit-consultation-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appointments as mockAppointments } from "@/lib/mock-data";
import { 
  UserCheck, 
  Clock, 
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function ConsultationsPage() {
  const { user } = useAuth();
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [activeConsultation, setActiveConsultation] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patient: "Maria Silva",
      date: "2024-01-15",
      time: "09:00",
      duration: "60 min",
      type: "Restauração + Limpeza",
      status: "Concluída",
      doctor: "Dr. Carlos Dentista",
      notes: "Restauração em resina composta no dente 16. Profilaxia realizada.",
      procedures: ["Anestesia", "Restauração", "Profilaxia"],
      teeth: "16"
    },
    {
      id: 2,
      patient: "João Santos",
      date: "2024-01-15",
      time: "10:30",
      duration: "45 min",
      type: "Endodontia - Sessão 2",
      status: "Em andamento",
      doctor: "Dr. Carlos Dentista",
      notes: "Continuidade do tratamento endodôntico do dente 36",
      procedures: ["Instrumentação", "Irrigação", "Curativo"],
      teeth: "36"
    },
    {
      id: 3,
      patient: "Ana Costa",
      date: "2024-01-14",
      time: "14:00",
      duration: "90 min",
      type: "Avaliação Ortodôntica",
      status: "Concluída",
      doctor: "Dr. Carlos Dentista",
      notes: "Moldagem para aparelho ortodôntico. Radiografias solicitadas.",
      procedures: ["Moldagem", "Fotografias", "Radiografias"],
      teeth: "Arcada completa"
    },
  ]);

  const handleStartConsultation = (appointment: any) => {
    const newConsultation = {
      id: Date.now(),
      patient: appointment.patient,
      date: appointment.date,
      time: appointment.time,
      duration: `${appointment.duration} min`,
      type: appointment.type,
      status: "Em andamento",
      doctor: appointment.doctor,
      notes: "",
      procedures: [],
      teeth: ""
    };
    setConsultations([newConsultation, ...consultations]);
    setActiveConsultation(newConsultation);
  };

  const handleEndConsultation = () => {
    setActiveConsultation(null);
  };

  const handleOpenDetailsModal = (consultation: any) => {
    setSelectedConsultation(consultation);
    setIsDetailsModalOpen(true);
  };

  const handleEditConsultation = (consultation: any) => {
    setSelectedConsultation(consultation);
    setIsEditModalOpen(true);
  };

  const handleUpdateConsultation = (updatedConsultation: any) => {
    setConsultations(consultations.map(c => c.id === updatedConsultation.id ? updatedConsultation : c));
    setIsEditModalOpen(false);
  };

  const handleDeleteConsultation = (consultationId: number) => {
    setConsultations(consultations.filter(c => c.id !== consultationId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Agendada":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const today = '2025-09-22';
  const appointmentsToday = mockAppointments.filter(apt => apt.date === today);

  return (
    <ProtectedRoute permission="consultations:manage">
      {activeConsultation ? (
        <ConsultationManager consultation={activeConsultation} onClose={handleEndConsultation} onUpdateConsultation={handleUpdateConsultation} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">🦷 Atendimentos Odontológicos</h1>
            <Button onClick={() => setIsStartModalOpen(true)}>
              <UserCheck className="mr-2 h-4 w-4" />
              Iniciar Atendimento
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar atendimentos por paciente ou procedimento..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Atendimentos Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-green-600 mt-1">2 em andamento</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Esta Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-blue-600 mt-1">+12% vs semana anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Tempo Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52min</div>
                <p className="text-xs text-gray-600 mt-1">Por atendimento</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Comparecimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-green-600 mt-1">Acima da média</p>
              </CardContent>
            </Card>
          </div>

          {/* Consultations List */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atendimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        <UserCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{consultation.patient}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(consultation.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {consultation.time} ({consultation.duration})
                          </span>
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {consultation.doctor}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{consultation.type}</p>
                        {consultation.teeth && (
                          <p className="text-sm text-blue-600 mt-1">
                            🦷 Dente(s): {consultation.teeth}
                          </p>
                        )}
                        {consultation.procedures && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {consultation.procedures.map((proc, idx) => (
                              <span key={idx} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                {proc}
                              </span>
                            ))}
                          </div>
                        )}
                        {consultation.notes && (
                          <p className="text-sm text-gray-500 mt-1 italic">"{consultation.notes}"</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultation.status)}`}>
                        {consultation.status}
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => handleOpenDetailsModal(consultation)}>
                        <FileText className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditConsultation(consultation)}>Editar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteConsultation(consultation.id)} className="text-red-500">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🦷 Atendimentos em Andamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consultations.filter(c => c.status === 'Em andamento').map(consultation => (
                    <div key={consultation.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">{consultation.patient}</p>
                        <p className="text-sm text-gray-600">{consultation.type}</p>
                        <p className="text-xs text-blue-600">Iniciada às {consultation.time}</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveConsultation(consultation)}>
                        Acessar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📅 Próximos Atendimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consultations.filter(c => c.status !== 'Concluída' && c.status !== 'Cancelada' && new Date(c.date) >= new Date() && c.doctor === (user?.name || '')).map(consultation => (
                    <div key={consultation.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">{consultation.patient}</p>
                        <p className="text-sm text-gray-600">{consultation.time} - {consultation.type}</p>
                        <p className="text-xs text-purple-600">{new Date(consultation.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setActiveConsultation(consultation)}>
                        Preparar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <StartConsultationModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        onStart={handleStartConsultation}
        appointments={appointmentsToday}
      />

      <ConsultationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        consultation={selectedConsultation}
      />

      <EditConsultationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateConsultation}
        consultation={selectedConsultation}
      />
    </ProtectedRoute>
  );

}