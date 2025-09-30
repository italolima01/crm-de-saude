"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { 
  BarChart3, 
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  FileText
} from "lucide-react";

import { ConsultationsChart } from "@/components/reports/consultations-chart";

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Relatório Mensal de Consultas",
      description: "Análise detalhada das consultas realizadas no mês",
      period: "Janeiro 2024",
      type: "Operacional",
      status: "Disponível"
    },
    {
      id: 2,
      title: "Relatório Financeiro",
      description: "Receitas, despesas e lucro do período",
      period: "Janeiro 2024",
      type: "Financeiro",
      status: "Disponível"
    },
    {
      id: 3,
      title: "Relatório de Pacientes",
      description: "Estatísticas sobre cadastros e atendimentos",
      period: "Janeiro 2024",
      type: "Pacientes",
      status: "Processando"
    },
  ];

  const quickStats = [
    {
      title: "Consultas Este Mês",
      value: "234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Receita Total",
      value: "R$ 45.230",
      change: "+18%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Tempo Médio de Consulta",
      value: "52min",
      change: "-3min",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Ocupação",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600"
    },
  ];

  return (
    <ProtectedRoute permission="reports:medical">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Período
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} vs mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>{report.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.status === "Disponível" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {report.status}
                      </span>
                      {report.status === "Disponível" && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chart Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consultas por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <ConsultationsChart />
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
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Dados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar Relatório
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo Personalizado
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Relatório Financeiro gerado</p>
                  <p className="text-gray-600">Há 2 horas</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Exportação de dados concluída</p>
                  <p className="text-gray-600">Há 5 horas</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Relatório mensal enviado</p>
                  <p className="text-gray-600">Ontem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}