"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import {
  Calendar,
  Users,
  FileText,
  DollarSign,
  Settings,
  Home,
  UserCheck,
  Clock,
  BarChart3,
  Building,
  Shield,
  Database,
} from "lucide-react";

const allMenuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    permission: null,
    roles: ["dev", "admin_sistema", "admin_clinica", "medico", "atendente"]
  },
  {
    title: "Sistema",
    href: "/system",
    icon: Database,
    permission: "system:manage",
    roles: ["dev"]
  },
  {
    title: "Clínicas Odontológicas",
    href: "/clinics",
    icon: Building,
    permission: "clinics:manage",
    roles: ["dev", "admin_sistema"]
  },
  {
    title: "Usuários",
    href: "/users",
    icon: Shield,
    permission: "users:manage",
    roles: ["dev", "admin_sistema", "admin_clinica"]
  },
  {
    title: "Pacientes",
    href: "/patients",
    icon: Users,
    permission: "patients:view",
    roles: ["admin_clinica", "medico", "atendente"]
  },
  {
    title: "Agendamentos",
    href: "/appointments",
    icon: Calendar,
    permission: "appointments:view",
    roles: ["admin_clinica", "medico", "atendente"]
  },
  {
    title: "Atendimentos",
    href: "/consultations",
    icon: UserCheck,
    permission: "consultations:manage",
    roles: ["admin_clinica", "medico"] // APENAS DENTISTAS E ADMIN
  },
  {
    title: "Prontuários Odontológicos",
    href: "/medical-records",
    icon: FileText,
    permission: "medical_records:view",
    roles: ["admin_clinica", "medico"] // APENAS DENTISTAS E ADMIN
  },
  {
    title: "Financeiro",
    href: "/financial",
    icon: DollarSign,
    permission: "financial:view",
    roles: ["admin_clinica", "atendente"] // APENAS RECEPCIONISTAS E ADMIN
  },
  {
    title: "Relatórios Clínicos",
    href: "/reports",
    icon: BarChart3,
    permission: "reports:medical",
    roles: ["admin_clinica", "medico"] // APENAS DENTISTAS E ADMIN
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
    permission: null,
    roles: ["dev", "admin_sistema", "admin_clinica", "medico", "atendente"]
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, hasPermission, hasRole } = useAuth();

  // Se não há usuário logado, não mostra o sidebar
  if (!user) {
    return null;
  }

  // Filtrar itens do menu baseado nas permissões e roles do usuário
  const menuItems = allMenuItems.filter(item => {
    // Verificar se o usuário tem o role necessário
    if (!hasRole(item.roles as any)) {
      return false;
    }
    
    // Verificar permissão específica se necessária
    if (item.permission && !hasPermission(item.permission)) {
      return false;
    }
    
    return true;
  });

  const getRoleLabel = (role: string) => {
    const labels = {
      dev: "Desenvolvedor",
      admin_sistema: "Admin Sistema",
      admin_clinica: "Admin Clínica Odontológica",
      medico: "Dentista",
      atendente: "Recepcionista"
    };
    return labels[role as keyof typeof labels] || role;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">🦷 DentalCRM</h1>
        <div className="mt-2 text-xs text-gray-500">
          {getRoleLabel(user.role)}
        </div>
        <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🧪 Modo Teste - {user.name}
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary border-r-2 border-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900" 
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}