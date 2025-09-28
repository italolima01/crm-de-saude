"use client";

import { Bell, Search, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Se não há usuário logado, não mostra o header
  if (!user) {
    return null;
  }
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar pacientes, agendamentos..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-96"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 group">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Dropdown de notificações */}
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Notificações</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Nova consulta agendada</p>
                  <p className="text-xs text-gray-600">Maria Silva - 14:00</p>
                  <p className="text-xs text-gray-500">Há 5 minutos</p>
                </div>
                <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Pagamento recebido</p>
                  <p className="text-xs text-gray-600">João Santos - R$ 150,00</p>
                  <p className="text-xs text-gray-500">Há 1 hora</p>
                </div>
                <div className="p-3 hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Lembrete: Reunião às 17h</p>
                  <p className="text-xs text-gray-600">Sala de conferências</p>
                  <p className="text-xs text-gray-500">Há 2 horas</p>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800">Ver todas</button>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.role === "dev" && "Desenvolvedor"}
                  {user.role === "admin_sistema" && "Admin Sistema"}
                  {user.role === "admin_clinica" && "Admin Clínica Odontológica"}
                  {user.role === "medico" && "Dentista"}
                  {user.role === "atendente" && "Recepcionista"}
                  {user.crm && ` - CRM: ${user.crm}`}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {user.avatar}
              </div>
            </div>
            
            {/* Dropdown do usuário */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <a href="/settings" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Meu Perfil
                </a>
                <a href="/settings" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Configurações
                </a>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  🚪 Sair (Testar outro usuário)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}