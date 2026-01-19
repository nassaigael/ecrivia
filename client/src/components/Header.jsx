// src/components/Header.jsx
import React from 'react';
import { LogOut } from 'lucide-react';
import logo from '../assets/images/logo.jpeg';

const Header = ({ userData, setIsLoggedIn }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} width={55} height={55} className="rounded-2xl" alt="Logo" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">EmailCraft AI</h1>
              <p className="text-sm text-gray-600">Rédaction d'e-mails avec Groq (Llama 3)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Bonjour, {userData.name}</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-5 w-5 inline-block mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;