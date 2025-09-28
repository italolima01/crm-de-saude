"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "dev" | "admin_sistema" | "admin_clinica" | "medico" | "atendente";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  crm?: string;
  clinicId?: string;
  avatar: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definição de permissões por role
const rolePermissions: Record<UserRole, string[]> = {
  dev: [
    "system:manage",
    "clinics:create",
    "clinics:delete",
    "users:manage",
    "reports:system",
    "settings:system"
  ],
  admin_sistema: [
    "clinics:manage",
    "users:create",
    "users:edit",
    "reports:system",
    "settings:system"
  ],
  admin_clinica: [
    "patients:manage",
    "appointments:manage",
    "financial:manage",
    "reports:clinic",
    "users:clinic",
    "settings:clinic",
    "medical_records:view",
    "consultations:view"
  ],
  medico: [
    // Pacientes
    "patients:view",
    "patients:edit",
    "patients:create",
    // Agendamentos
    "appointments:view",
    "appointments:create",
    "appointments:edit",
    // EXCLUSIVO DENTISTA: Atendimentos odontológicos
    "consultations:manage",
    "consultations:create",
    "consultations:edit",
    // EXCLUSIVO DENTISTA: Prontuários odontológicos
    "medical_records:manage",
    "medical_records:create",
    "medical_records:edit",
    "medical_records:view",
    // EXCLUSIVO DENTISTA: Relatórios odontológicos
    "reports:medical",
    "reports:own",
    // Configurações básicas
    "settings:profile"
  ],
  atendente: [
    // Pacientes (limitado)
    "patients:view",
    "patients:create",
    "patients:edit",
    // Agendamentos (completo)
    "appointments:manage",
    "appointments:create",
    "appointments:edit",
    "appointments:view",
    // Financeiro (limitado)
    "financial:view",
    "financial:create",
    "financial:edit",
    // Configurações básicas
    "settings:profile"
    // NÃO TEM: atendimentos, prontuários_odontológicos, relatórios
  ]
};

// Usuários mock para demonstração
const mockUsers: User[] = [
  {
    id: "1",
    name: "Dev Master",
    email: "dev@sistema.com",
    role: "dev",
    avatar: "DM",
    permissions: rolePermissions.dev
  },
  {
    id: "2",
    name: "Admin Sistema",
    email: "admin@sistema.com",
    role: "admin_sistema",
    avatar: "AS",
    permissions: rolePermissions.admin_sistema
  },
  {
    id: "3",
    name: "Dr. João Silva",
    email: "joao@clinica.com",
    role: "medico",
    crm: "CD-12345-SP",
    clinicId: "clinic1",
    avatar: "JS",
    permissions: rolePermissions.medico
  },
  {
    id: "4",
    name: "Dr. Carlos Dentista",
    email: "carlos@clinica.com",
    role: "medico",
    crm: "CD-54321-SP",
    clinicId: "clinic1",
    avatar: "CD",
    permissions: rolePermissions.medico
  },
  {
    id: "5",
    name: "Ana Recepcionista",
    email: "ana@clinica.com",
    role: "atendente",
    clinicId: "clinic1",
    avatar: "AR",
    permissions: rolePermissions.atendente
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção seria uma chamada à API
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === "123456") { // Senha mock
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      hasPermission,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}