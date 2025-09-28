"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
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

export default function ConsultationsPage() {
  const consultations = [
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
  ];

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

  return (
    <ProtectedRoute permission="consultations:manage">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">🦷 Atendimentos Odontológicos</h1>
        <Button>
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
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Ver Detalhes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
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
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">João Santos</p>
                  <p className="text-sm text-gray-600">Consultório 1 - Endodontia dente 36</p>
                  <p className="text-xs text-blue-600">Iniciada às 10:30</p>
                </div>
                <Button size="sm">
                  Acessar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📅 Próximos Atendimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Pedro Lima</p>
                  <p className="text-sm text-gray-600">15:30 - Manutenção Ortodôntica</p>
                  <p className="text-xs text-purple-600">🦷 Aparelho fixo</p>
                </div>
                <Button size="sm" variant="outline">
                  Preparar
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Carla Mendes</p>
                  <p className="text-sm text-gray-600">16:30 - Limpeza + Avaliação</p>
                  <p className="text-xs text-green-600">🧽 Profilaxia</p>
                </div>
                <Button size="sm" variant="outline">
                  Preparar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}