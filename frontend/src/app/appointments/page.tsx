"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddAppointmentModal } from "@/components/appointments/add-appointment-modal";
import { WeekView } from "@/components/appointments/week-view";
import { MonthView } from "@/components/appointments/month-view";
import { RescheduleAppointmentModal } from "@/components/appointments/reschedule-appointment-modal";
import { useAuth } from "@/contexts/auth-context";
import { mockUsers } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Calendar,
  Clock,
  User,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const startOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export default function AppointmentsPage() {
  const router = useRouter();
  const { user, hasPermission } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date('2025-09-22T12:00:00'));
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  const handleOpenModal = (time?: string) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const doctors = mockUsers.filter(user => user.role === 'medico');
  const [appointments, setAppointments] = useState([
    // Day View Appointments (4)
    { id: 1, patient: "Maria Silva", date: "2025-09-22", time: "09:00", duration: 60, type: "Consulta", status: "Confirmado", doctor: "Dr. João Silva" },
    { id: 2, patient: "João Santos", date: "2025-09-22", time: "10:30", duration: 30, type: "Retorno", status: "Em andamento", doctor: "Dr. João Silva" },
    { id: 3, patient: "Ana Costa", date: "2025-09-22", time: "14:00", duration: 60, type: "Primeira consulta", status: "Aguardando", doctor: "Dr. Carlos Dentista" },
    { id: 4, patient: "Pedro Lima", date: "2025-09-22", time: "15:30", duration: 45, type: "Consulta", status: "Confirmado", doctor: "Dr. Carlos Dentista" },

    // Week View Appointments (5)
    { id: 5, patient: "Carla Mendes", date: "2025-09-23", time: "11:00", duration: 30, type: "Retorno", status: "Cancelado", doctor: "Dr. Carlos Dentista" },
    { id: 6, patient: "Roberto Carlos", date: "2025-09-24", time: "09:30", duration: 60, type: "Consulta", status: "Confirmado", doctor: "Dr. João Silva" },
    { id: 7, patient: "Maria Bethania", date: "2025-09-25", time: "14:30", duration: 30, type: "Retorno", status: "Em andamento", doctor: "Dr. João Silva" },
    { id: 8, patient: "Gal Costa", date: "2025-09-26", time: "16:00", duration: 60, type: "Primeira consulta", status: "Aguardando", doctor: "Dr. Carlos Dentista" },
    { id: 9, patient: "Caetano Veloso", date: "2025-09-26", time: "17:00", duration: 45, type: "Consulta", status: "Confirmado", doctor: "Dr. Carlos Dentista" },

    // Month View Appointments (7)
    { id: 10, patient: "Gilberto Gil", date: "2025-09-29", time: "08:00", duration: 30, type: "Retorno", status: "Cancelado", doctor: "Dr. Carlos Dentista" },
    { id: 11, patient: "Elis Regina", date: "2025-10-01", time: "11:30", duration: 60, type: "Consulta", status: "Confirmado", doctor: "Dr. João Silva" },
    { id: 12, patient: "Tom Jobim", date: "2025-10-03", time: "10:00", duration: 45, type: "Primeira consulta", status: "Aguardando", doctor: "Dr. Carlos Dentista" },
    { id: 13, patient: "Vinicius de Moraes", date: "2025-10-08", time: "16:30", duration: 60, type: "Consulta", status: "Confirmado", doctor: "Dr. João Silva" },
    { id: 14, patient: "Chico Buarque", date: "2025-10-15", time: "09:00", duration: 30, type: "Retorno", status: "Em andamento", doctor: "Dr. João Silva" },
    { id: 15, patient: "Nara Leão", date: "2025-10-22", time: "14:00", duration: 60, type: "Primeira consulta", status: "Aguardando", doctor: "Dr. Carlos Dentista" },
    { id: 16, patient: "Milton Nascimento", date: "2025-10-31", time: "15:00", duration: 45, type: "Consulta", status: "Confirmado", doctor: "Dr. Carlos Dentista" },
  ]);

  const handleAddAppointment = (newAppointment: any) => {
    setAppointments([...appointments, newAppointment]);
  };

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleRescheduleAppointment = (appointmentId: number, newDate: string, newTime: string) => {
    setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, date: newDate, time: newTime } : apt
    ));
  };

  const filteredAppointments = appointments.filter(appointment => {
    const isMedico = user?.role === 'medico';
    const doctorMatch = isMedico ? appointment.doctor === user.name : (doctorFilter === "all" || appointment.doctor === doctorFilter);
    const statusMatch = statusFilter === "all" || appointment.status === statusFilter;

    return doctorMatch && statusMatch;
  });

  const periodAppointments = filteredAppointments.filter(appointment => {
    const appointmentDate = startOfDay(parseDate(appointment.date));
    const current = startOfDay(currentDate);

    if (viewMode === 'day') {
      return appointmentDate.getTime() === current.getTime();
    }
    if (viewMode === 'week') {
      const startOfWeek = new Date(current);
      startOfWeek.setDate(current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    }
    if (viewMode === 'month') {
      return appointmentDate.getMonth() === current.getMonth() && appointmentDate.getFullYear() === current.getFullYear();
    }
    return false;
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

  const goToPrevious = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (viewMode === 'day') {
        newDate.setDate(prevDate.getDate() - 1);
      } else if (viewMode === 'week') {
        newDate.setDate(prevDate.getDate() - 7);
      } else if (viewMode === 'month') {
        newDate.setMonth(prevDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const goToNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (viewMode === 'day') {
        newDate.setDate(prevDate.getDate() + 1);
      } else if (viewMode === 'week') {
        newDate.setDate(prevDate.getDate() + 7);
      } else if (viewMode === 'month') {
        newDate.setMonth(prevDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
        <div className="flex space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <label className="text-sm font-medium">Dentista</label>
                <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dentista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {doctors.map(doc => (
                      <SelectItem key={doc.id} value={doc.name}>{doc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Confirmado">Confirmado</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Aguardando">Aguardando</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => handleOpenModal()}>
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
              <Button variant="outline" size="sm" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold capitalize">
                {formatDate(currentDate)}
              </h2>
              <Button variant="outline" size="sm" onClick={goToNext}>
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
          {viewMode === 'month' ? (
            <MonthView appointments={filteredAppointments} currentDate={currentDate} parseDate={parseDate} handleStatusChange={handleStatusChange} hasPermission={hasPermission} />
          ) : viewMode === 'week' ? (
            <WeekView appointments={filteredAppointments} currentDate={currentDate} parseDate={parseDate} handleStatusChange={handleStatusChange} hasPermission={hasPermission} />
          ) : (
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
                    const appointment = filteredAppointments.find(apt => apt.time === time && startOfDay(parseDate(apt.date)).getTime() === startOfDay(currentDate).getTime());
                    
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
                                  {hasPermission('appointments:edit') ? (
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <p className="text-xs font-bold opacity-75 cursor-pointer">{appointment.status}</p>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuLabel>Mudar Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Confirmado')}>Confirmado</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Em andamento')}>Em andamento</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Aguardando')}>Aguardando</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Cancelado')}>Cancelado</DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  ) : (
                                    <p className="text-xs font-bold opacity-75">{appointment.status}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">{appointment.duration}min</p>
                                  <p className="text-xs opacity-75">{appointment.doctor}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400 hover:border-blue-300 hover:text-blue-500 cursor-pointer transition-colors" onClick={() => handleOpenModal(time)}>
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
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total de consultas</span>
                  <span className="font-semibold">{periodAppointments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Confirmadas
                  </span>
                  <span className="font-semibold text-green-600">{periodAppointments.filter(a => a.status === 'Confirmado').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                    Em andamento
                  </span>
                  <span className="font-semibold text-blue-600">{periodAppointments.filter(a => a.status === 'Em andamento').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    Aguardando
                  </span>
                  <span className="font-semibold text-yellow-600">{periodAppointments.filter(a => a.status === 'Aguardando').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    Canceladas
                  </span>
                  <span className="font-semibold text-red-600">{periodAppointments.filter(a => a.status === 'Cancelado').length}</span>
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
                <Button variant="outline" className="w-full justify-start" onClick={() => handleOpenModal()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Agendamento
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsRescheduleModalOpen(true)}>
                  <Clock className="mr-2 h-4 w-4" />
                  Reagendar
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/lista-de-espera')}>
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
                {periodAppointments.slice(0, 3).map((appointment) => (
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
        doctors={doctors}
        date={currentDate.toISOString().split('T')[0]}
        time={selectedTime}
      />

      <RescheduleAppointmentModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onSave={handleRescheduleAppointment}
        appointments={appointments}
      />
    </div>
  );
}