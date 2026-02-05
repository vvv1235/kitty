import { ReactNode } from 'react';
import Link from 'next/link';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600">Kitty Adoption</Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-600 hover:text-indigo-600">Home</Link></li>
              <li><Link href="/pets" className="text-gray-600 hover:text-indigo-600">Pets</Link></li>
              <li><Link href="/shelters" className="text-gray-600 hover:text-indigo-600">Shelters</Link></li>
              <li><Link href="/login" className="text-gray-600 hover:text-indigo-600">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Kitty Adoption. Connecting loving homes with adorable cats.</p>
        </div>
      </footer>
    </div>
  );
}