'use client'

import { ReactNode } from 'react';
import Link from 'next/link';
import { Cat, Search, LogOut, Settings, Users, PlusCircle } from 'lucide-react';
interface PublicLayoutProps {
  children: ReactNode;
}

import { useState } from 'react';

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = (confirm: boolean) => {
    if (confirm) {
      // Redirecionar para a página inicial
      window.location.href = '/';
    }
    setShowLogoutConfirm(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de busca
    console.log('Buscando por:', searchQuery);
    // Por exemplo, redirecionar para uma página de resultados de busca
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center text-xl font-bold text-pink-600 select-none cursor-default">
            <Cat className="h-6 w-6 mr-2" />
            Kitty
          </div>
          
          {/* Barra de pesquisa */}
          <form onSubmit={handleSearch} className="flex-1 mx-8 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar pets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </form>
          
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/addpet" className="flex items-center text-gray-600 hover:text-pink-600"><PlusCircle className="h-4 w-4 mr-1" /> Anunciar Pet</Link></li>
              <li><Link href="/shelters" className="flex items-center text-gray-600 hover:text-pink-600"><Users className="h-4 w-4 mr-1" /> Abrigos</Link></li>
              <li><Link href="/account-settings" className="flex items-center text-gray-600 hover:text-pink-600"><Settings className="h-4 w-4 mr-1" /> Configurações</Link></li>
              <li>
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center text-gray-600 hover:text-pink-600"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Sair
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Modal de confirmação de logout */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmação</h3>
              <p className="text-gray-600 mb-6">Deseja deslogar da sua conta?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Não
                </button>
                <button
                  onClick={() => handleLogout(true)}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Kitty. Conectando lares cheios de amor com pets adoráveis.</p>
        </div>
      </footer>
    </div>
  );
}