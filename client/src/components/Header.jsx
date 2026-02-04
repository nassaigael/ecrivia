import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, User, LogOut, AlertCircle } from 'lucide-react';
import Logo from '../assets/images/logo.png';

export default function Header({ userData, logout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState('');
  const [, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    setLogoutError('');
    
    try {
      if (window.puter && window.puter.auth) {
        console.log('Tentative de déconnexion via Puter SDK...');
        try {
          await window.puter.auth.signOut();
          console.log('Déconnexion Puter SDK réussie');
        } catch (puterError) {
          console.warn('Puter SDK déconnexion échouée:', puterError);
        }
      }
      
      localStorage.removeItem('puterUser');
      localStorage.removeItem('puter_session');
      localStorage.removeItem('puter_token');
      
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        
        if (name.includes('puter') || name.includes('auth') || name.includes('session') || name.includes('token')) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      }
      
      logout();
      
      setShowDropdown(false);
      
      setTimeout(() => {
        window.location.reload();
      }, 300);
      
    } catch (error) {
      console.error('Erreur lors de la déconnexion complète:', error);
      setLogoutError('Erreur lors de la déconnexion. Veuillez recharger la page manuellement.');
      
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = window.location.origin;
      }, 1500);
    } finally {
      setIsLoggingOut(false);
    }
  };

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
          <div className="absolute right-0 top-full mt-2 w-72 bg-white text-gray-900 rounded-xl shadow-xl border border-gray-200 p-4 transition-all duration-200 opacity-100 scale-100 transform">
            <div className="mb-4">
              <p className="font-semibold text-gray-900 break-words" title={displayName}>
                {displayName}
              </p>
              <p className="text-sm text-gray-500 break-words">{userData.email}</p>
              {userData.username && (
                <p className="text-xs text-gray-400 mt-1">@{userData.username}</p>
              )}
            </div>
            
            {logoutError && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{logoutError}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <button
                onClick={handleLogoutClick}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Déconnexion...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Déconnexion Puter
                  </>
                )}
              </button>
            
            </div>
          </div>
        )}
      </div>
    </header>
  );
}