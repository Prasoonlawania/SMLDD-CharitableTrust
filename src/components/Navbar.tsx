import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { useAppContext } from '../AppContext';

export /* */ function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAppContext();

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Updates', href: '#updates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container relative mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <img src="/logo-1.png" alt="SMLDD Logo" className="h-10 w-10 object-contain rounded" />
            SMLDD <span className="hidden sm:inline font-medium text-gray-500">Charitable Trust</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {links.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  {link.name}
                </a>
              ))}
            </div>
            {isAdmin && <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold uppercase">Admin</span>}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 md:hidden flex flex-col space-y-4">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-gray-800 font-medium hover:text-blue-600 block py-2 border-b border-gray-50 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
