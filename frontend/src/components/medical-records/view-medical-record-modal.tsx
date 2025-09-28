"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, Pill, AlertTriangle, Download, Edit } from "lucide-react";

interface MedicalRecord {
  id: number;
  patient: string;
  date: string;
  type: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  diagnosis: string;
  treatment: string;
  medications: string;
  observations: string;
  followUp: string;
  doctor: string;
  createdAt: string;
}

interface ViewMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: MedicalRecord | null;
}

export function ViewMedicalRecordModal({ isOpen, onClose, record }: ViewMedicalRecordModalProps) {
  if (!record) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prontuário Odontológico">
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">{record.patient}</h3>
              <p className="text-sm text-blue-700">
                {record.type} - {formatDate(record.date)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-900">{record.doctor}</p>
              <p className="text-xs text-blue-700">CRM: 654321-SP</p>
            </div>
          </div>
        </div>

        {/* Queixa Principal */}
        {record.chiefComplaint && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
              Queixa Principal
            </h4>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700">{record.chiefComplaint}</p>
            </div>
          </div>
        )}

        {/* História da Doença Atual */}
        {record.historyOfPresentIllness && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">📋 História Odontológica Atual</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{record.historyOfPresentIllness}</p>
            </div>
          </div>
        )}

        {/* Exame Físico */}
        {record.physicalExamination && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">🔍 Exame Clínico Intraoral</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{record.physicalExamination}</p>
            </div>
          </div>
        )}

        {/* Diagnóstico */}
        {record.diagnosis && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-green-500" />
              Diagnóstico
            </h4>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700 font-medium">{record.diagnosis}</p>
            </div>
          </div>
        )}

        {/* Plano de Tratamento */}
        {record.treatment && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">🩺 Plano de Tratamento</h4>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{record.treatment}</p>
            </div>
          </div>
        )}

        {/* Medicações */}
        {record.medications && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Pill className="h-4 w-4 mr-2 text-purple-500" />
              Medicações Prescritas
            </h4>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{record.medications}</p>
            </div>
          </div>
        )}

        {/* Observações */}
        {record.observations && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">📝 Observações</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{record.observations}</p>
            </div>
          </div>
        )}

        {/* Seguimento */}
        {record.followUp && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              Seguimento
            </h4>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">{record.followUp}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Registro criado em: {formatDate(record.createdAt)}</span>
            <span>ID: #{record.id}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
}