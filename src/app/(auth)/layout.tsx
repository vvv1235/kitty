import { ReactNode } from 'react';
import Link from 'next/link';
import { Cat } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <div className="flex items-center text-xl font-bold text-pink-600 select-none cursor-default">
            <Cat className="h-6 w-6 mr-2" />
            Kitty 
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Kitty Adoption. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}