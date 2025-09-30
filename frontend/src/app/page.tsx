"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  UserCheck,
  AlertCircle,
  Plus
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // ou um loading spinner
  }
  const stats = [
    {
      title: "Total de Pacientes",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Atendimentos Hoje",
      value: "23",
      change: "+5%",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Receita Mensal",
      value: "R$ 45.230",
      change: "+18%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Taxa de Ocupação",
      value: "87%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: "Maria Silva",
      time: "09:00",
      type: "Limpeza + Restauração",
      status: "Confirmado",
    },
    {
      id: 2,
      patient: "João Santos",
      time: "10:30",
      type: "Tratamento de Canal",
      status: "Em andamento",
    },
    {
      id: 3,
      patient: "Ana Costa",
      time: "14:00",
      type: "Primeira Consulta",
      status: "Aguardando",
    },
    {
      id: 4,
      patient: "Pedro Lima",
      time: "15:30",
      type: "Manutenção Ortodôntica",
      status: "Confirmado",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1 font-bold text-text-main">Dashboard</h1>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => router.push('/appointments')}>
            <Calendar className="mr-2 h-4 w-4" />
            Ver Agenda
          </Button>
          <Button onClick={() => router.push('/appointments')}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-normal text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-h1 font-bold text-text-main">{stat.value}</div>
                <p className="text-sm text-green-600 mt-1">
                  {stat.change} em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Agendamentos de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-text-main">
                    <p className="font-semibold text-base">{appointment.patient}</p>
                    <p className="text-sm font-normal text-gray-600">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-main text-base">{appointment.time}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === "Confirmado"
                          ? "bg-success/10 text-success"
                          : appointment.status === "Aguardando"
                          ? "bg-attention text-attention-foreground"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => router.push('/appointments')}>
              Ver Todos os Agendamentos
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/patients')}>
                <Users className="h-6 w-6 mb-2" />
                Novo Paciente
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/appointments')}>
                <Calendar className="h-6 w-6 mb-2" />
                Agendar Consulta
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/financial')}>
                <DollarSign className="h-6 w-6 mb-2" />
                Registrar Pagamento
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/consultations')}>
                <AlertCircle className="h-6 w-6 mb-2" />
                Urgência Odontológica
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <AlertCircle className="mr-2 h-5 w-5" />
            Alertas e Lembretes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-yellow-800">3 pacientes com tratamentos em atraso</p>
                <p className="text-sm text-yellow-600">Verificar reagendamentos de continuidade</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Clock className="h-4 w-4 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-blue-800">Lembrete: Esterilização dos instrumentos às 17h</p>
                <p className="text-sm text-blue-600">Sala de esterilização</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Level Info */}
      <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            🔐 Seu Nível de Acesso: {user.role === "medico" ? "🦷 Dentista" : user.role === "atendente" ? "👩‍💻 Recepcionista" : "👨‍💼 " + user.role}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2">✅ Você TEM acesso a:</h4>
              <ul className="text-sm space-y-1">
                {user.role === "medico" && (
                  <>
                    <li>• 👥 Pacientes (visualizar/editar)</li>
                    <li>• 📅 Agendamentos</li>
                    <li>• 🦷 <strong>Consultas Odontológicas</strong></li>
                    <li>• 📋 <strong>Prontuários Odontológicos</strong></li>
                    <li>• 📊 <strong>Relatórios Clínicos</strong></li>
                  </>
                )}
                {user.role === "atendente" && (
                  <>
                    <li>• 👥 Pacientes (cadastrar/editar)</li>
                    <li>• 📅 Agendamentos (completo)</li>
                    <li>• 💰 Financeiro (recebimentos/pagamentos)</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2">❌ Você NÃO tem acesso a:</h4>
              <ul className="text-sm space-y-1">
                {user.role === "medico" && (
                  <>
                    <li>• 💰 Módulo Financeiro</li>
                  </>
                )}
                {user.role === "atendente" && (
                  <>
                    <li>• 🦷 <strong>Consultas Odontológicas</strong></li>
                    <li>• 📋 <strong>Prontuários Odontológicos</strong></li>
                    <li>• 📊 <strong>Relatórios</strong></li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Dica:</strong> Faça logout e teste com diferentes usuários para ver as diferenças de acesso!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}