"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { 
  Building, 
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
  Users,
  Calendar,
  MoreHorizontal
} from "lucide-react";

export default function ClinicsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const clinics = [
    {
      id: 1,
      name: "Clínica Vida Nova",
      address: "Rua das Flores, 123 - São Paulo/SP",
      phone: "(11) 3456-7890",
      email: "contato@vidanova.com",
      users: 15,
      patients: 1234,
      status: "Ativa",
      plan: "Premium"
    },
    {
      id: 2,
      name: "Centro Médico Saúde",
      address: "Av. Paulista, 456 - São Paulo/SP",
      phone: "(11) 2345-6789",
      email: "admin@centrosade.com",
      users: 8,
      patients: 567,
      status: "Ativa",
      plan: "Básico"
    },
    {
      id: 3,
      name: "Clínica Bem Estar",
      address: "Rua da Saúde, 789 - Rio de Janeiro/RJ",
      phone: "(21) 3456-7890",
      email: "contato@bemestar.com",
      users: 12,
      patients: 890,
      status: "Suspensa",
      plan: "Premium"
    },
  ];

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute role={["dev", "admin_sistema"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Clínicas</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Clínica
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Clínicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-green-600 mt-1">+2 este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Clínicas Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-blue-600 mt-1">83% do total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Usuários Totais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-green-600 mt-1">+15 este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Receita Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 24.500</div>
              <p className="text-xs text-green-600 mt-1">+18% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar clínicas por nome ou email..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Clinics List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Clínicas ({filteredClinics.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium">
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{clinic.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {clinic.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {clinic.phone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {clinic.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {clinic.users} usuários
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {clinic.patients} pacientes
                        </span>
                        <span>Plano: {clinic.plan}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      clinic.status === "Ativa"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {clinic.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}