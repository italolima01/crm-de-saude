"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AddMedicalRecordModal } from "@/components/medical-records/add-medical-record-modal";
import { ViewMedicalRecordModal } from "@/components/medical-records/view-medical-record-modal";
import { 
  ArrowLeft,
  Plus,
  FileText,
  Calendar,
  User,
  AlertTriangle,
  Tooth,
  Eye,
  Download,
  Clock
} from "lucide-react";

export default function PatientMedicalHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id;
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Dados do paciente (simulação)
  const patient = {
    id: patientId,
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    birthDate: "1985-03-15",
    cpf: "123.456.789-00",
    address: "Rua das Flores, 123 - São Paulo/SP",
    emergencyContact: "João Silva",
    emergencyPhone: "(11) 88888-8888",
    allergies: ["Penicilina", "Lidocaína"],
    status: "Ativo"
  };

  // Histórico odontológico do paciente
  const [medicalHistory, setMedicalHistory] = useState([
    {
      id: 1,
      patient: "Maria Silva",
      date: "2024-01-15",
      type: "Consulta Inicial",
      chiefComplaint: "Dor no dente 36 (molar inferior esquerdo)",
      historyOfPresentIllness: "Paciente relata dor intensa há 3 dias, principalmente ao mastigar. Dor pulsátil que piora à noite. Já tomou analgésicos sem melhora significativa.",
      physicalExamination: "Exame intraoral: Dente 36 com cárie extensa oclusal, teste de percussão positivo, teste térmico com resposta prolongada ao frio. Gengiva ao redor levemente edemaciada.",
      diagnosis: "K02.1 - Cárie dentária da dentina (Dente 36) com possível comprometimento pulpar",
      treatment: "Indicado tratamento endodôntico do dente 36. Prescrição de analgésico e anti-inflamatório para controle da dor.",
      medications: "Ibuprofeno 600mg - 1 cp de 8/8h por 3 dias\nParacetamol 750mg - 1 cp de 6/6h se dor",
      observations: "Paciente orientada sobre higiene oral e importância do tratamento. Alergia à Penicilina e Lidocaína - usar anestésicos alternativos.",
      followUp: "Retorno em 3 dias para início do tratamento endodôntico",
      doctor: "Dr. Carlos Dentista",
      crm: "CD-12345-SP",
      createdAt: "2024-01-15T14:30:00",
      toothChart: "36",
      procedures: ["Exame clínico", "Radiografia periapical", "Teste de vitalidade pulpar"]
    },
    {
      id: 2,
      patient: "Maria Silva", 
      date: "2024-01-18",
      type: "Tratamento Endodôntico - Sessão 1",
      chiefComplaint: "Retorno para tratamento do dente 36",
      historyOfPresentIllness: "Paciente retorna para início do tratamento endodôntico. Relata melhora da dor com medicação prescrita.",
      physicalExamination: "Dente 36 com abertura coronária realizada. Localização dos canais MV, ML e D. Odontometria realizada.",
      diagnosis: "K04.0 - Pulpite (Dente 36) - em tratamento",
      treatment: "Primeira sessão de endodontia: abertura coronária, localização dos canais, odontometria, instrumentação inicial dos canais radiculares.",
      medications: "Manter Ibuprofeno se necessário",
      observations: "Procedimento realizado sob anestesia com Articaína (sem vasoconstritor devido à alergia). Paciente tolerou bem o procedimento.",
      followUp: "Retorno em 7 dias para continuidade do tratamento endodôntico",
      doctor: "Dr. Carlos Dentista",
      crm: "CD-12345-SP", 
      createdAt: "2024-01-18T15:00:00",
      toothChart: "36",
      procedures: ["Abertura coronária", "Odontometria", "Instrumentação radicular", "Curativo de demora"]
    },
    {
      id: 3,
      patient: "Maria Silva",
      date: "2024-01-25", 
      type: "Tratamento Endodôntico - Finalização",
      chiefComplaint: "Finalização do tratamento de canal do dente 36",
      historyOfPresentIllness: "Paciente assintomática, sem dor. Retorna para finalização do tratamento endodôntico.",
      physicalExamination: "Dente 36 sem sintomatologia. Canais preparados adequadamente na sessão anterior.",
      diagnosis: "K04.0 - Tratamento endodôntico finalizado (Dente 36)",
      treatment: "Obturação dos canais radiculares com guta-percha e cimento endodôntico. Restauração provisória com ionômero de vidro.",
      medications: "Não prescrito",
      observations: "Tratamento endodôntico finalizado com sucesso. Orientações pós-operatórias fornecidas. Necessário restauração definitiva.",
      followUp: "Retorno em 15 dias para avaliação e agendamento de restauração definitiva",
      doctor: "Dr. Carlos Dentista",
      crm: "CD-12345-SP",
      createdAt: "2024-01-25T16:00:00", 
      toothChart: "36",
      procedures: ["Obturação radicular", "Restauração provisória", "Radiografia final"]
    }
  ]);

  const handleAddRecord = (newRecord: any) => {
    const recordWithPatient = {
      ...newRecord,
      patient: patient.name,
      toothChart: newRecord.toothChart || "",
      procedures: newRecord.procedures || []
    };
    setMedicalHistory([...medicalHistory, recordWithPatient]);
  };

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (date: string) => {
    const recordDate = new Date(date);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return "border-l-green-500 bg-green-50";
    if (diffDays <= 30) return "border-l-blue-500 bg-blue-50";
    return "border-l-gray-500 bg-gray-50";
  };

  return (
    <ProtectedRoute permission="medical_records:view">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Histórico Odontológico</h1>
              <p className="text-gray-600">{patient.name}</p>
            </div>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Consulta
          </Button>
        </div>

        {/* Patient Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informações do Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Dados Pessoais</p>
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">{patient.email}</p>
                <p className="text-sm text-gray-600">{patient.phone}</p>
                <p className="text-sm text-gray-600">CPF: {patient.cpf}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contato de Emergência</p>
                <p className="font-medium">{patient.emergencyContact}</p>
                <p className="text-sm text-gray-600">{patient.emergencyPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                  Alergias Importantes
                </p>
                {patient.allergies.map((allergy, index) => (
                  <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical History Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Histórico de Consultas ({medicalHistory.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicalHistory.map((record, index) => (
                <div
                  key={record.id}
                  className={`border-l-4 pl-4 py-3 rounded-r-lg ${getStatusColor(record.date)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{record.type}</h3>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </span>
                        {record.toothChart && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <Tooth className="h-3 w-3 mr-1" />
                            Dente {record.toothChart}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Queixa:</strong> {record.chiefComplaint}
                      </p>
                      
                      {record.diagnosis && (
                        <p className="text-sm text-green-700 mb-2">
                          <strong>Diagnóstico:</strong> {record.diagnosis}
                        </p>
                      )}
                      
                      {record.procedures && record.procedures.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-gray-600 mb-1">Procedimentos realizados:</p>
                          <div className="flex flex-wrap gap-1">
                            {record.procedures.map((procedure, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {procedure}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{record.doctor}</span>
                        <span>{record.crm}</span>
                        {record.followUp && (
                          <span className="text-orange-600">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {record.followUp}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewRecord(record)}
                        title="Ver detalhes completos"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Exportar">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {medicalHistory.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum registro encontrado</p>
                  <Button className="mt-4" onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Registro
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{medicalHistory.length}</p>
                <p className="text-sm text-gray-600">Total de Consultas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {medicalHistory.filter(r => new Date(r.date) > new Date(Date.now() - 30*24*60*60*1000)).length}
                </p>
                <p className="text-sm text-gray-600">Últimos 30 dias</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{patient.allergies.length}</p>
                <p className="text-sm text-gray-600">Alergias Registradas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {medicalHistory[medicalHistory.length - 1] ? 
                    new Date(medicalHistory[medicalHistory.length - 1].date).toLocaleDateString('pt-BR') : 
                    'N/A'
                  }
                </p>
                <p className="text-sm text-gray-600">Última Consulta</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <AddMedicalRecordModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddRecord}
        />

        <ViewMedicalRecordModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          record={selectedRecord}
        />
      </div>
    </ProtectedRoute>
  );
}