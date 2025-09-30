"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AddMedicalRecordModal } from "@/components/medical-records/add-medical-record-modal";
import { ViewMedicalRecordModal } from "@/components/medical-records/view-medical-record-modal";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Calendar,
  User,
  AlertTriangle,
  Clock,
  Pill
} from "lucide-react";

import { FilterMedicalRecordModal } from "@/components/medical-records/filter-medical-record-modal";

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordTemplate, setRecordTemplate] = useState<any | null>(null);
  const [filters, setFilters] = useState({ status: "", hasAllergies: "" });
  const [medicalRecords, setMedicalRecords] = useState([
    // Dados dos pacientes com histórico odontológico
    {
      id: 1,
      patient: "Maria Silva",
      lastUpdate: "2024-01-15",
      recordsCount: 12,
      lastDiagnosis: "K02.1 - Cárie dentária da dentina (Dente 36)",
      allergies: ["Penicilina", "Lidocaína"],
      medications: ["Ibuprofeno 600mg", "Paracetamol 750mg"],
      status: "Ativo"
    },
    {
      id: 2,
      patient: "João Santos",
      lastUpdate: "2024-01-10",
      recordsCount: 8,
      lastDiagnosis: "K05.1 - Gengivite crônica",
      allergies: [],
      medications: ["Clorexidina 0,12%", "Ibuprofeno 400mg"],
      status: "Ativo"
    },
    {
      id: 3,
      patient: "Ana Costa",
      lastUpdate: "2023-12-20",
      recordsCount: 5,
      lastDiagnosis: "K08.1 - Perda de dente por cárie",
      allergies: ["Sulfa", "Anestésicos locais"],
      medications: ["Amoxicilina 500mg"],
      status: "Inativo"
    },
  ]);

  // Registros odontológicos detalhados (simulação)
  const [detailedRecords, setDetailedRecords] = useState([
    {
      id: 1,
      patient: "Maria Silva",
      date: "2024-01-15",
      type: "Avaliação Inicial",
      chiefComplaint: "Dor intensa no dente 36 ao mastigar",
      historyOfPresentIllness: "Paciente relata dor no dente 36 há 5 dias, que piora ao mastigar alimentos duros. Dor pulsátil que aumenta à noite. Já utilizou analgésicos com alívio parcial.",
      physicalExamination: "Exame intraoral: Dente 36 com cárie oclusal extensa, teste de percussão positivo, teste térmico com resposta prolongada ao frio. Gengiva periapical levemente edemaciada.",
      diagnosis: "K02.1 - Cárie dentária da dentina (Dente 36) com comprometimento pulpar",
      treatment: "Indicado tratamento endodôntico do dente 36. Prescrição de analgésico e anti-inflamatório para controle da dor até o início do tratamento.",
      medications: "Ibuprofeno 600mg - 1 cp de 8/8h por 3 dias\nParacetamol 750mg - 1 cp de 6/6h se dor",
      observations: "Paciente orientada sobre higiene oral e importância do tratamento. Alergia à Penicilina registrada - usar anestésicos alternativos.",
      followUp: "Retorno em 3 dias para início do tratamento endodôntico",
      doctor: "Dr. Carlos Dentista",
      createdAt: "2024-01-15T09:30:00"
    }
  ]);

  const defaultTemplate = {
    type: 'Avaliação de Rotina',
    chiefComplaint: 'Paciente para avaliação de rotina e profilaxia.',
    historyOfPresentIllness: 'Paciente não relata histórico de doença atual.',
    physicalExamination: 'Exame clínico sem alterações significativas.',
    diagnosis: 'Paciente hígido, sem necessidade de intervenção imediata.',
    treatment: 'Profilaxia e aplicação de flúor.',
    followUp: 'Retorno em 6 meses para nova avaliação.'
  };

  const initialEvaluationTemplate = {
    type: 'Avaliação Inicial',
    chiefComplaint: 'Paciente para avaliação inicial.',
    historyOfPresentIllness: '',
    physicalExamination: '',
    diagnosis: '',
    treatment: '',
    medications: '',
    observations: '',
    followUp: '',
  };

  const treatmentContinuityTemplate = {
    type: 'Continuidade de Tratamento',
    chiefComplaint: 'Retorno para continuidade de tratamento.',
    historyOfPresentIllness: 'Paciente segue plano de tratamento estabelecido.',
    physicalExamination: '',
    diagnosis: '',
    treatment: '',
    medications: '',
    observations: '',
    followUp: '',
  };

  const dentalEmergencyTemplate = {
    type: 'Urgência Odontológica',
    chiefComplaint: 'Paciente com dor aguda/emergência.',
    historyOfPresentIllness: '',
    physicalExamination: '',
    diagnosis: 'Necessidade de intervenção imediata.',
    treatment: 'Alívio da dor e tratamento emergencial.',
    medications: '',
    observations: 'Prioridade de atendimento.',
    followUp: '',
  };

  const cleaningTemplate = {
    type: 'Limpeza e Profilaxia',
    chiefComplaint: 'Paciente para limpeza e profilaxia de rotina.',
    historyOfPresentIllness: '',
    physicalExamination: 'Gengivas saudáveis, sem sinais de inflamação.',
    diagnosis: 'Saúde bucal em dia.',
    treatment: 'Remoção de tártaro e placa, aplicação de flúor.',
    medications: '',
    observations: 'Orientação sobre higiene bucal.',
    followUp: 'Retorno em 6 meses.',
  };

  const handleAddRecord = (newRecord: any) => {
    setDetailedRecords([...detailedRecords, newRecord]);
  };

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const filteredRecords = medicalRecords.filter(record => {
    const searchTermMatch = record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.lastDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = filters.status ? record.status === filters.status : true;

    const allergiesMatch = filters.hasAllergies ? (filters.hasAllergies === 'yes' ? record.allergies.length > 0 : record.allergies.length === 0) : true;

    return searchTermMatch && statusMatch && allergiesMatch;
  });

  const recentEntries = [
    {
      id: 1,
      patient: "Maria Silva",
      date: "2024-01-15",
      type: "Avaliação Inicial",
      summary: "Cárie extensa no dente 36, indicado tratamento endodôntico"
    },
    {
      id: 2,
      patient: "João Santos",
      date: "2024-01-10",
      type: "Exame",
      summary: "Glicemia de jejum: 110mg/dL - dentro dos parâmetros"
    },
    {
      id: 3,
      patient: "Ana Costa",
      date: "2023-12-20",
      type: "Prescrição",
      summary: "Ajuste na dosagem da medicação para ansiedade"
    },
  ];

  return (
    <ProtectedRoute permission="medical_records:view">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">📋 Prontuários Odontológicos</h1>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button onClick={() => {
                      setRecordTemplate(null);
                      setIsAddModalOpen(true);
                    }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Registro
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar prontuários por paciente, dente ou diagnóstico..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  📋 Todos
                </button>
                <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                  ✅ Ativos
                </button>
                <button className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200">
                  ⚠️ Com Alergias
                </button>
                <button className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">
                  🦷 Em Tratamento
                </button>
                <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200">
                  🚨 Urgência Odontológica
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Prontuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-green-600 mt-1">+45 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Atualizados Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-blue-600 mt-1">Registros novos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Alertas Odontológicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">7</div>
              <p className="text-xs text-orange-600 mt-1">Requerem atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Prontuários Digitais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-green-600 mt-1">Taxa de digitalização</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Medical Records List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Prontuários dos Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{record.patient}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${record.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                              }`}>
                              {record.status}
                            </span>
                            {record.allergies.length > 0 && (
                              <span className="flex items-center text-orange-600">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                <span className="text-xs">Alergias</span>
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>Última atualização:</strong> {new Date(record.lastUpdate).toLocaleDateString('pt-BR')}</p>
                              <p><strong>Total de registros:</strong> {record.recordsCount}</p>
                              <p><strong>Último diagnóstico:</strong> {record.lastDiagnosis}</p>
                            </div>
                            <div>
                              {record.allergies.length > 0 && (
                                <p><strong>Alergias:</strong> {record.allergies.join(", ")}</p>
                              )}
                              <p><strong>Medicações atuais:</strong></p>
                              <ul className="list-disc list-inside ml-2">
                                {record.medications.map((med, index) => (
                                  <li key={index} className="text-xs">{med}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewRecord(detailedRecords.find(r => r.patient === record.patient) || {
                              id: record.id,
                              patient: record.patient,
                              date: record.lastUpdate,
                              type: "Avaliação Inicial",
                              chiefComplaint: "Registro não detalhado",
                              diagnosis: record.lastDiagnosis,
                              medications: record.medications.join(", "),
                              doctor: "Dra. Maria Santos",
                              createdAt: record.lastUpdate
                            })}
                            title="Visualizar prontuário"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Editar prontuário">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Exportar PDF">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Entries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Registros Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {detailedRecords.slice(-3).reverse().map((entry) => (
                    <div key={entry.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleViewRecord(entry)}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{entry.patient}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 mb-1 flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {entry.type}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2">{entry.chiefComplaint}</p>
                      {entry.diagnosis && (
                        <p className="text-xs text-green-600 mt-1 font-medium">
                          📋 {entry.diagnosis}
                        </p>
                      )}
                    </div>
                  ))}
                  {detailedRecords.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Nenhum registro encontrado</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Medical Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-orange-600">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Alertas Odontológicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="font-medium text-sm text-orange-800">Maria Silva</p>
                    <p className="text-xs text-orange-600">🚨 Alergia à Penicilina e Lidocaína - Usar anestésicos alternativos</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-medium text-sm text-red-800">João Santos</p>
                    <p className="text-xs text-red-600">🦷 Gengivite em progressão - Agendar raspagem periodontal</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-medium text-sm text-yellow-800">Ana Costa</p>
                    <p className="text-xs text-yellow-600">🔄 Tratamento de canal pendente - Finalizar endodontia</p>
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
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Registro
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => { setRecordTemplate(defaultTemplate); setIsAddModalOpen(true); }}>
                    <FileText className="mr-2 h-4 w-4" />
                    Modelo de Prontuário
                  </Button>
<Button variant="outline" className="w-full justify-start" onClick={() => window.print()}>
                    Exportar Relatório
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Templates Rápidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 text-sm hover:bg-blue-50 rounded border border-gray-200"
                    onClick={() => { setRecordTemplate(initialEvaluationTemplate); setIsAddModalOpen(true); }}>
                     Avaliação Inicial
                  </button>
                  <button className="w-full text-left p-2 text-sm hover:bg-green-50 rounded border border-gray-200"
                    onClick={() => { setRecordTemplate(treatmentContinuityTemplate); setIsAddModalOpen(true); }}>
                    🔄 Continuidade de Tratamento
                  </button>
                  <button className="w-full text-left p-2 text-sm hover:bg-red-50 rounded border border-gray-200"
                    onClick={() => { setRecordTemplate(dentalEmergencyTemplate); setIsAddModalOpen(true); }}>
                    🚨 Urgência Odontológica
                  </button>
                  <button className="w-full text-left p-2 text-sm hover:bg-purple-50 rounded border border-gray-200"
                    onClick={() => { setRecordTemplate(cleaningTemplate); setIsAddModalOpen(true); }}>
                    🧽 Limpeza e Profilaxia
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <AddMedicalRecordModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setRecordTemplate(null);
          }}
          onSave={handleAddRecord}
          template={recordTemplate}
        />

        <ViewMedicalRecordModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          record={selectedRecord}
        />

        <FilterMedicalRecordModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={setFilters}
        />
      </div>
    </ProtectedRoute>
  );
}
