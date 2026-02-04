// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, User, LogOut } from 'lucide-react';
import Logo from '../assets/images/logo.png';

export default function Header({ userData, logout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
    setAvatarSrc('');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    // Nettoyer la session Puter
    if (window.puter && window.puter.auth) {
      window.puter.auth.signOut().catch(console.error);
    }
    
    logout();
    setShowDropdown(false);
  };

  // Charger l'avatar
  useEffect(() => {
    if (userData.picture) {
      setAvatarSrc(userData.picture);
      setImageLoaded(false);
      setImageError(false);
    } else {
      setAvatarSrc('');
      setImageError(true);
    }
  }, [userData.picture]);

  const displayName = userData.name || userData.username || 'Utilisateur';

  return (
    <header className="bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative z-50 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-lg" />
        <span className="text-lg sm:text-xl font-bold text-gray-700">ECRIVIA</span>
      </div>
      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={showDropdown}
          aria-label="Menu utilisateur"
          className="cursor-pointer hover:scale-105 transition-transform"
          title={displayName}
        >
          {avatarSrc && !imageError ? (
            <img
              src={avatarSrc}
              alt="Photo de profil"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 hover:border-blue-500 transition-colors"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow-md">
              {displayName.charAt(0).toUpperCase() || 'P'}
            </div>
          )}
        </div>
        <div
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          {showDropdown ? (
            <ChevronUp className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600" />
          )}
        </div>
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white text-gray-900 rounded-xl shadow-xl border border-gray-200 p-4 transition-all duration-200 opacity-100 scale-100 transform">
            <div className="mb-4">
              <p className="font-semibold text-gray-900 break-words" title={displayName}>
                {displayName}
              </p>
              <p className="text-sm text-gray-500 break-words">{userData.email}</p>
              {userData.username && (
                <p className="text-xs text-gray-400 mt-1">@{userData.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion Puter
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}