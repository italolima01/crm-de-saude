"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddPatientModal } from "@/components/patients/add-patient-modal";
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  User,
  FileText
} from "lucide-react";

export default function PatientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 99999-9999",
      birthDate: "1985-03-15",
      lastVisit: "2024-01-15",
      status: "Ativo",
      avatar: "MS"
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(11) 88888-8888",
      birthDate: "1978-07-22",
      lastVisit: "2024-01-10",
      status: "Ativo",
      avatar: "JS"
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 77777-7777",
      birthDate: "1992-11-08",
      lastVisit: "2023-12-20",
      status: "Inativo",
      avatar: "AC"
    },
    {
      id: 4,
      name: "Pedro Lima",
      email: "pedro.lima@email.com",
      phone: "(11) 66666-6666",
      birthDate: "1980-05-30",
      lastVisit: "2024-01-12",
      status: "Ativo",
      avatar: "PL"
    },
  ]);

  const handleAddPatient = (newPatient: any) => {
    setPatients([...patients, newPatient]);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Paciente
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
                placeholder="Buscar pacientes por nome ou email..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {patient.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {patient.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {patient.phone}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Última visita: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === "Ativo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {patient.status}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/patients/${patient.id}/medical-history`)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Histórico
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPatients.length === 0 && (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum paciente encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600 mt-1">+12% este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Novos Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-green-600 mt-1">+8% este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pacientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,156</div>
            <p className="text-xs text-blue-600 mt-1">94% do total</p>
          </CardContent>
        </Card>
      </div>

      {/* Modal para adicionar paciente */}
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddPatient}
      />
    </div>
  );
}