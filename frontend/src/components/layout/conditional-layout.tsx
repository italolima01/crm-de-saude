"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Sidebar from "./sidebar";
import Header from "./header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Páginas que não devem mostrar o layout principal
  const publicPages = ["/login"];
  const isPublicPage = publicPages.includes(pathname);
  
  // Se é uma página pública ou não há usuário logado, mostrar apenas o conteúdo
  if (isPublicPage || !user) {
    return <>{children}</>;
  }
  
  // Caso contrário, mostrar o layout completo
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main key={pathname} className="flex-1 p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}