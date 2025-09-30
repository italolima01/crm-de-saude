"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/");
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (user: any) => {
    setIsLoading(true);
    setError("");
    try {
      const success = await login(user.email, user.password);
      if (success) {
        router.push("/");
      } else {
        setError("Falha ao fazer login com usuário demo.");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = [
    { email: "dev@sistema.com", role: "Desenvolvedor", password: "123456" },
    { email: "admin@sistema.com", role: "Admin Sistema", password: "123456" },
    { email: "joao@clinica.com", role: "Admin Clínica Odontológica", password: "123456" },
    { email: "carlos@clinica.com", role: "Dentista", password: "123456" },
    { email: "ana@clinica.com", role: "Recepcionista", password: "123456" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in-0 duration-500">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900">
            🦷 DentalCRM
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sistema Completo para Clínicas Odontológicas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl">Fazer Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Entrando...
                    </>
                  ) : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Users */}
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">👤 Usuários Demo - Clique para Testar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg">
                  <strong>🚀 Modo Teste:</strong> Clique em qualquer usuário abaixo para fazer login automaticamente e explorar diferentes níveis de acesso!
                </p>
                {demoUsers.map((user, index) => (
                  <button
                    key={user.email}
                    onClick={() => handleDemoLogin(user)}
                    className="w-full text-left p-4 hover:bg-blue-50 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{user.role}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-xs text-blue-600 mt-1">
                          {index === 0 && "🔧 Acesso total ao sistema"}
                          {index === 1 && "🏢 Gerencia múltiplas clínicas"}
                          {index === 2 && "👨‍💼 Administra uma clínica"}
                          {index === 3 && "🦷 Acesso odontológico completo"}
                          {index === 4 && "👩‍💻 Recepção e agendamentos"}
                        </div>
                      </div>
                      <div className="text-2xl">
                        {index === 0 && "🔧"}
                        {index === 1 && "🏢"}
                        {index === 2 && "👨‍💼"}
                        {index === 3 && "🦷"}
                        {index === 4 && "👩‍💻"}
                      </div>
                    </div>
                  </button>
                ))}
                <div className="text-center mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Senha para todos:</strong> <code className="bg-gray-200 px-2 py-1 rounded">123456</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}