// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, User, LogOut } from 'lucide-react';
import Logo from '../assets/images/logo.jpeg';

export default function Header({ userData, logout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(''); // Sera l'URL blob ou fallback
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef(null);
  const blobUrlRef = useRef(''); // Pour cleanup blob URL

  // Fetch image comme blob pour bypass CORS/OpaqueResponseBlocking
  const fetchAvatarAsBlob = async (url) => {
    if (!url) return;
    try {
      console.log('Fetch blob pour URL:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      blobUrlRef.current = blobUrl; // Cleanup plus tard
      setAvatarSrc(blobUrl);
      setImageLoaded(true);
      setImageError(false);
      console.log('Blob créé et chargé !');
    } catch (err) {
      console.error('Fetch blob échoué:', err);
      setImageError(true);
      setAvatarSrc('');
    }
  };

  const handleImageError = () => {
    console.log('Fallback <img> échoué – URL:', avatarSrc);
    setImageError(true);
    setAvatarSrc('');
  };

  const handleImageLoad = () => {
    console.log('Fallback <img> chargé !');
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
    logout();
    setShowDropdown(false);
  };

  // Cleanup blob URL sur unmount/change
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        console.log('Blob URL nettoyé');
      }
    };
  }, []);

  useEffect(() => {
    const url = userData.picture ? `${userData.picture}&sz=40` : '';
    console.log('Tentative photo:', url);
    setAvatarSrc('');
    setImageLoaded(false);
    setImageError(false);
    if (url) {
      fetchAvatarAsBlob(url);
    }
  }, [userData.picture]);

  const displayName = userData.name || 'Utilisateur';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative z-50 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo MonApp" className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-lg" />
        <span className="text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-200">ECRIVIA</span>
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
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-colors"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-white flex items-center justify-center font-semibold shadow-md">
              {displayName.charAt(0).toUpperCase() || 'U'}
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
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 opacity-100 scale-100 transform">
            <div className="mb-4">
              <p className="font-semibold text-gray-900 dark:text-white break-words" title={displayName} lang="fr-MG">
                {displayName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 break-words">{userData.email}</p>
            </div>
            <div className="space-y-2">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};