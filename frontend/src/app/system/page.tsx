"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { 
  Database, 
  Server, 
  Activity,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function SystemPage() {
  return (
    <ProtectedRoute permission="system:manage">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Painel do Sistema</h1>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Monitoramento
            </Button>
            <Button>
              <Database className="mr-2 h-4 w-4" />
              Backup
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Clínicas Ativas
              </CardTitle>
              <Building className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-green-600 mt-1">+2 este mês</p>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Usuários Totais
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-green-600 mt-1">+89 este mês</p>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Uptime do Sistema
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-green-600 mt-1">Últimos 30 dias</p>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Alertas Ativos
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-xs text-orange-600 mt-1">Requer atenção</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health */}
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Banco de Dados</span>
                  </div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">API Gateway</span>
                  </div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Cache Redis</span>
                  </div>
                  <span className="text-sm text-yellow-600">Degradado</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Storage</span>
                  </div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Nova clínica cadastrada</p>
                    <p className="text-xs text-gray-600">Clínica Vida Nova - São Paulo</p>
                    <p className="text-xs text-gray-500">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Backup automático concluído</p>
                    <p className="text-xs text-gray-600">Backup diário executado com sucesso</p>
                    <p className="text-xs text-gray-500">Há 6 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Atualização do sistema</p>
                    <p className="text-xs text-gray-600">Versão 2.1.3 implantada</p>
                    <p className="text-xs text-gray-500">Ontem</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Actions */}
        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Ações do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Database className="h-6 w-6 mb-2" />
                Gerenciar Backup
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Server className="h-6 w-6 mb-2" />
                Monitorar Servidores
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Activity className="h-6 w-6 mb-2" />
                Logs do Sistema
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}