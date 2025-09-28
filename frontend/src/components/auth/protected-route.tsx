"use client";

import { useAuth, UserRole } from "@/contexts/auth-context";
import { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  permission?: string;
  role?: UserRole | UserRole[];
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  permission, 
  role, 
  fallback 
}: ProtectedRouteProps) {
  const { user, hasPermission, hasRole } = useAuth();

  if (!user) {
    return fallback || <LoginRequired />;
  }

  if (permission && !hasPermission(permission)) {
    return fallback || <AccessDenied />;
  }

  if (role && !hasRole(role)) {
    return fallback || <AccessDenied />;
  }

  return <>{children}</>;
}

function LoginRequired() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Login Necessário</h2>
        <p className="text-gray-600">Você precisa estar logado para acessar esta página.</p>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Negado</h2>
        <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
      </div>
    </div>
  );
}