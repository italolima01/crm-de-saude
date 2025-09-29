"use client";

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WeekViewProps {
  appointments: any[];
  currentDate: Date;
  parseDate: (dateString: string) => Date;
  handleStatusChange: (appointmentId: number, newStatus: string) => void;
  hasPermission: (permission: string) => boolean;
}

export function WeekView({ appointments, currentDate, parseDate, handleStatusChange, hasPermission }: WeekViewProps) {
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const getWeekDays = (date: Date) => {
      const startOfWeek = new Date(date);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      startOfWeek.setDate(diff);

      const days = [];
      for (let i = 0; i < 7; i++) {
        const weekDay = new Date(startOfWeek);
        weekDay.setDate(startOfWeek.getDate() + i);
        days.push(weekDay);
      }
      return days;
    };

    setWeekDays(getWeekDays(currentDate));
  }, [currentDate]);

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00"
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

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekDays.map(day => (
        <div key={day.toISOString()} className="border border-gray-200 rounded-lg p-2">
          <h3 className="text-center font-semibold">{day.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}</h3>
          <div className="mt-2 space-y-2">
            {appointments
              .filter(apt => parseDate(apt.date).toDateString() === day.toDateString())
              .map(appointment => (
                <div key={appointment.id} className={`p-2 rounded-lg border ${getStatusColor(appointment.status)}`}>
                  <p className="font-medium text-sm">{appointment.patient}</p>
                  <p className="text-xs opacity-75">{appointment.time} - {appointment.doctor}</p>
                  {appointment.createdBy !== appointment.doctor && <p className="text-xs opacity-50">Criado por: {appointment.createdBy}</p>}
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
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
