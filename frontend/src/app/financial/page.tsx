"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddTransactionModal } from "@/components/financial/add-transaction-modal";
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  AlertCircle,
  Plus,
  Download,
  Filter,
  Calendar
} from "lucide-react";

export default function FinancialPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      patient: "Maria Silva",
      date: "2024-01-15",
      description: "Consulta médica",
      amount: 150.00,
      status: "Pago",
      method: "Cartão de Crédito"
    },
    {
      id: 2,
      patient: "João Santos",
      date: "2024-01-14",
      description: "Exames laboratoriais",
      amount: 280.00,
      status: "Pendente",
      method: "PIX"
    },
    {
      id: 3,
      patient: "Ana Costa",
      date: "2024-01-13",
      description: "Consulta + Medicamentos",
      amount: 320.00,
      status: "Pago",
      method: "Dinheiro"
    },
    {
      id: 4,
      patient: "Pedro Lima",
      date: "2024-01-12",
      description: "Procedimento especializado",
      amount: 450.00,
      status: "Atrasado",
      method: "Boleto"
    },
  ]);

  const handleAddTransaction = (newTransaction: any) => {
    setTransactions([...transactions, newTransaction]);
  };

  const pendingPayments = [
    {
      id: 1,
      patient: "João Santos",
      amount: 280.00,
      dueDate: "2024-01-20",
      daysOverdue: 0
    },
    {
      id: 2,
      patient: "Pedro Lima",
      amount: 450.00,
      dueDate: "2024-01-10",
      daysOverdue: 5
    },
    {
      id: 3,
      patient: "Carla Mendes",
      amount: 180.00,
      dueDate: "2024-01-18",
      daysOverdue: 0
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Relatório
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Receita Mensal
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.230</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% vs mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Recebimentos Hoje
            </CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.340</div>
            <p className="text-xs text-blue-600 mt-1">8 transações</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pendências
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">R$ 3.120</div>
            <p className="text-xs text-orange-600 mt-1">12 pagamentos pendentes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Taxa de Inadimplência
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-green-600 mt-1">-0.5% vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transações Recentes</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{transaction.patient}</h3>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                          <span>•</span>
                          <CreditCard className="h-3 w-3" />
                          <span>{transaction.method}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(transaction.amount)}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-orange-600">
                <AlertCircle className="mr-2 h-4 w-4" />
                Pagamentos Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className={`p-3 rounded-lg border ${
                    payment.daysOverdue > 0 
                      ? "bg-red-50 border-red-200" 
                      : "bg-yellow-50 border-yellow-200"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{payment.patient}</p>
                      <span className="font-semibold text-sm">
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Vencimento: {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                    {payment.daysOverdue > 0 && (
                      <p className="text-xs text-red-600 font-medium">
                        {payment.daysOverdue} dias em atraso
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Todos
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cartão de Crédito</span>
                  <span className="font-semibold">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">PIX</span>
                  <span className="font-semibold">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dinheiro</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Boleto</span>
                  <span className="font-semibold">10%</span>
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
                  Registrar Pagamento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="mr-2 h-4 w-4" />
                  Gerar Cobrança
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Relatório Mensal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Monthly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Receita Total</p>
              <p className="text-2xl font-bold text-green-600">R$ 45.230</p>
              <p className="text-xs text-green-600 mt-1">+18% vs mês anterior</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Despesas</p>
              <p className="text-2xl font-bold text-red-600">R$ 12.450</p>
              <p className="text-xs text-red-600 mt-1">+5% vs mês anterior</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Lucro Líquido</p>
              <p className="text-2xl font-bold text-blue-600">R$ 32.780</p>
              <p className="text-xs text-green-600 mt-1">+24% vs mês anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal para nova transação */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTransaction}
      />
    </div>
  );
}