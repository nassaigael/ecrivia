import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, User, LogOut, AlertCircle, Sparkles } from 'lucide-react';
import Logo from '../assets/images/logo.png';

export default function Header({ userData, logout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState('');
  const [, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

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

  // Effet sticky au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <>
      {/* Espace réservé pour éviter le saut de contenu quand le header devient sticky */}
      <div ref={headerRef} className="sticky-placeholder" style={{ height: isSticky ? '80px' : '0px' }} />
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className={`px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-50 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 right-0' : 'relative'
        }`}
        style={{
          background: "#f0e2e6",
          boxShadow: isSticky 
            ? "25px 25px 50px #d0b6be, -25px -25px 50px #ffffff, 0 4px 20px rgba(0,0,0,0.05)" 
            : "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
          margin: isSticky ? "0" : "10px 20px",
          borderRadius: isSticky ? "0 0 50px 50px" : "50px",
          top: 0,
          width: isSticky ? "100%" : "auto",
        }}
      >
        {/* Logo section */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-2xl p-2"
            style={{
              background: "#f0e2e6",
              boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
            }}
          >
            <img 
              src={Logo} 
              alt="logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-xl" 
            />
          </motion.div>
          <motion.span 
            className="text-lg sm:text-2xl font-bold tracking-tight hidden sm:block"
            style={{
              background: "linear-gradient(135deg, #c23b78, #d95c92)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 4px #ffffff"
            }}
          >
            ECRIVIA
          </motion.span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#d95c92" }} />
          </motion.div>
        </motion.div>

        {/* User menu section */}
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-expanded={showDropdown}
            aria-label="Menu utilisateur"
            className="cursor-pointer"
            title={displayName}
          >
            {avatarSrc && !imageError ? (
              <motion.img
                src={avatarSrc}
                alt="Photo de profil"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                style={{
                  boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
                  border: "2px solid #f0e2e6"
                }}
              />
            ) : (
              <motion.div 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-semibold"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
                  color: "#c23b78"
                }}
              >
                {displayName.charAt(0).toUpperCase() || 'U'}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="cursor-pointer"
          >
            {showDropdown ? (
              <ChevronUp className="h-5 w-5" style={{ color: "#c23b78" }} />
            ) : (
              <ChevronDown className="h-5 w-5" style={{ color: "#c23b78" }} />
            )}
          </motion.div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-full mt-3 w-80 rounded-2xl p-4"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "20px 20px 40px #d0b6be, -20px -20px 40px #ffffff",
                }}
              >
                {/* User info */}
                <motion.div 
                  className="mb-4 p-3 rounded-xl text-center"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "inset 5px 5px 12px #d0b6be, inset -5px -5px 12px #ffffff",
                  }}
                >
                  <div className="flex justify-center mb-2">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background: "#f0e2e6",
                        boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
                      }}
                    >
                      <User className="h-6 w-6" style={{ color: "#c23b78" }} />
                    </div>
                  </div>
                  <p className="font-semibold break-words text-base" style={{ color: "#c23b78" }}>
                    {displayName}
                  </p>
                  <p className="text-sm break-words mt-1" style={{ color: "#d95c92" }}>
                    {userData.email}
                  </p>
                  {userData.username && (
                    <p className="text-xs mt-1" style={{ color: "#e07aa3" }}>
                      @{userData.username}
                    </p>
                  )}
                </motion.div>
                
                {/* Error message */}
                <AnimatePresence>
                  {logoutError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3 p-3 rounded-xl overflow-hidden"
                      style={{
                        background: "#f0e2e6",
                        boxShadow: "inset 5px 5px 12px #d0b6be, inset -5px -5px 12px #ffffff",
                      }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4" style={{ color: "#c23b78" }} />
                        <span style={{ color: "#c23b78" }}>{logoutError}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Logout button */}
                <motion.button
                  onClick={handleLogoutClick}
                  disabled={isLoggingOut}
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
                    color: "#c23b78"
                  }}
                >
                  {isLoggingOut ? (
                    <>
                      <motion.div 
                        className="rounded-full h-4 w-4 border-2"
                        style={{ borderColor: "#c23b78", borderTopColor: "transparent" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Déconnexion...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion Puter</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}