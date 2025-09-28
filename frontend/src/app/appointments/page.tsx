"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddAppointmentModal } from "@/components/appointments/add-appointment-modal";
import { useAuth } from "@/contexts/auth-context";
import { 
  Plus, 
  Calendar,
  Clock,
  User,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Maria Silva",
      time: "09:00",
      duration: 60,
      type: "Consulta",
      status: "Confirmado",
      doctor: "Dr. João Silva"
    },
    {
      id: 2,
      patient: "João Santos",
      time: "10:30",
      duration: 30,
      type: "Retorno",
      status: "Em andamento",
      doctor: "Dr. João Silva"
    },
    {
      id: 3,
      patient: "Ana Costa",
      time: "14:00",
      duration: 60,
      type: "Primeira consulta",
      status: "Aguardando",
      doctor: "Dr. Carlos Dentista"
    },
    {
      id: 4,
      patient: "Pedro Lima",
      time: "15:30",
      duration: 45,
      type: "Consulta",
      status: "Confirmado",
      doctor: "Dr. Carlos Dentista"
    },
    {
      id: 5,
      patient: "Carla Mendes",
      time: "16:30",
      duration: 30,
      type: "Retorno",
      status: "Cancelado",
      doctor: "Dr. Carlos Dentista"
    },
  ]);

  const handleAddAppointment = (newAppointment: any) => {
    setAppointments([...appointments, newAppointment]);
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (user?.role === 'medico') {
      return appointment.doctor === user.name;
    }
    return true;
  });

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-100 text-green-800 border-green-200";
      case "Em andamento":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Aguardando":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold capitalize">
                {formatDate(currentDate)}
              </h2>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={viewMode === 'day' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Dia
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Semana
              </Button>
              <Button 
                variant={viewMode === 'month' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Mês
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Agenda do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeSlots.map((time) => {
                  const appointment = filteredAppointments.find(apt => apt.time === time);
                  
                  return (
                    <div key={time} className="flex items-center min-h-[60px] border-b border-gray-100">
                      <div className="w-16 text-sm text-gray-600 font-medium">
                        {time}
                      </div>
                      <div className="flex-1 ml-4">
                        {appointment ? (
                          <div className={`p-3 rounded-lg border ${getStatusColor(appointment.status)}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <p className="text-sm opacity-75">{appointment.type}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{appointment.duration}min</p>
                                <p className="text-xs opacity-75">{appointment.doctor}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400 hover:border-blue-300 hover:text-blue-500 cursor-pointer transition-colors">
                            <Plus className="h-4 w-4 mx-auto mb-1" />
                            <span className="text-xs">Disponível</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total de consultas</span>
                  <span className="font-semibold">{filteredAppointments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Confirmadas</span>
                  <span className="font-semibold text-green-600">{filteredAppointments.filter(a => a.status === 'Confirmado').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Em andamento</span>
                  <span className="font-semibold text-blue-600">{filteredAppointments.filter(a => a.status === 'Em andamento').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aguardando</span>
                  <span className="font-semibold text-yellow-600">{filteredAppointments.filter(a => a.status === 'Aguardando').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Canceladas</span>
                  <span className="font-semibold text-red-600">{filteredAppointments.filter(a => a.status === 'Cancelado').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Agendamento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Reagendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Lista de Espera
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm">{appointment.patient}</p>
                    <p className="text-xs text-gray-600">{appointment.time} - {appointment.type}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para novo agendamento */}
      <AddAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAppointment}
      />
    </div>
  );
}