import React, { useState } from 'react';
import Logo from '../assets/images/logoEcrivia.jpeg'

export default function Header({ userData, logout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
      <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center relative z-50">
         <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-gray-700">MonApp</span>

        </div>

         <div className="relative flex items-center gap-2">
           <div onClick={toggleDropdown} className="cursor-pointer">
            {userData.picture ? (
                <img
                    src={userData.picture}
                    alt="Profil"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center">
                  {userData.name?.charAt(0).toUpperCase() || 'U'}
                </div>
            )}
          </div>

          {/* Chevron (optionnel) */}
          <i
              className={`fa fa-chevron-${showDropdown ? 'up' : 'down'} text-gray-600 cursor-pointer`}
              onClick={toggleDropdown}
          ></i>

          {/* Dropdown utilisateur */}
          {showDropdown && (
              <div className="absolute right-0 top-14 w-64 bg-gray-800 text-white rounded-lg shadow-lg p-4">
                <p className="font-semibold mb-1">{userData.name}</p>
                <p className="text-sm mb-3 break-words">{userData.email}</p>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-md text-sm"
                >
                  Log Out
                </button>
              </div>
          )}
        </div>
      </header>
  );
}
