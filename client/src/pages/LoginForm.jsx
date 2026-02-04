// src/pages/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { usePuterAuth } from '../hooks/usePuterAuth';
import logo from '../assets/images/logo.png';

const LoginForm = ({ setUserData, setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signInWithPuter, checkPuterSession } = usePuterAuth();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await checkPuterSession();
        if (user) {
          handlePuterUser(user);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.log('Pas de session Puter existante');
      }
    };
    
    const checkPuterLoaded = () => {
      if (window.puter) {
        initAuth();
      } else {
        setTimeout(checkPuterLoaded, 100);
      }
    };
    
    checkPuterLoaded();
  }, []);

  const handlePuterUser = (puterUser) => {
    const userInfo = {
      id: puterUser.username || `user_${Date.now()}`,
      name: puterUser.name || puterUser.username || 'Utilisateur Puter',
      email: puterUser.email || `${puterUser.username || 'user'}@puter.com`,
      picture: puterUser.avatar || '',
      username: puterUser.username || '',
    };
    
    console.log('User info Puter.js:', userInfo);
    setUserData(userInfo);
    setIsLoggedIn(true);
    localStorage.setItem('puterUser', JSON.stringify(userInfo));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const user = await signInWithPuter();
      if (user) {
        handlePuterUser(user);
      } else {
        throw new Error('Authentification échouée');
      }
    } catch (err) {
      console.error('Erreur connexion Puter:', err);
      setError('Erreur lors de la connexion avec Puter. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8 flex flex-col items-center gap-4">
            <img src={logo} width={55} height={55} className="rounded-2xl" alt="Logo ECRIVIA" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">ECRIVIA</h1>
              <p className="text-gray-600">Générateur d'emails intelligent</p>
            </div>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Se connecter avec Puter
                </>
              )}
            </button>
            
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Utilisez votre compte Puter pour accéder à ECRIVIA
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Si vous n'avez pas de compte Puter, il sera créé automatiquement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;