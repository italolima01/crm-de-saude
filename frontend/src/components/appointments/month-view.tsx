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

interface MonthViewProps {
  appointments: any[];
  currentDate: Date;
  parseDate: (dateString: string) => Date;
  handleStatusChange: (appointmentId: number, newStatus: string) => void;
  hasPermission: (permission: string) => boolean;
}

export function MonthView({ appointments, currentDate, parseDate, handleStatusChange, hasPermission }: MonthViewProps) {
  const [monthDays, setMonthDays] = useState<Date[]>([]);
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    const getMonthDays = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const startDayOfWeek = firstDayOfMonth.getDay();

      const days = [];

      // Add empty cells for the days before the first day of the month
      for (let i = 0; i < startDayOfWeek; i++) {
        days.push(null);
      }

      // Add the days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      return days;
    };

    setDays(getMonthDays(currentDate));
  }, [currentDate]);

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

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-4">
        {weekDays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={index} className={`border border-gray-200 rounded-lg p-2 h-32 ${day ? '' : 'bg-gray-50'}`}>
            {day && (
              <>
                <div className="text-sm font-semibold">{day.getDate()}</div>
                <div className="mt-1 space-y-1 h-24 overflow-auto">
                  {appointments
                    .filter(apt => parseDate(apt.date).toDateString() === day.toDateString())
                    .map(appointment => (
                      <div key={appointment.id} className={`p-1 rounded-lg border ${getStatusColor(appointment.status)}`}>
                        <p className="font-medium text-xs truncate">{appointment.patient}</p>
                        {appointment.createdBy !== appointment.doctor && <p className="text-xs opacity-50 truncate">Por: {appointment.createdBy}</p>}
                        {hasPermission('appointments:edit') ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <p className="text-xs opacity-75 truncate cursor-pointer">{appointment.status}</p>
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
                          <p className="text-xs opacity-75 truncate">{appointment.status}</p>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
