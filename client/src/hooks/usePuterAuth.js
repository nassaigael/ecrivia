// src/hooks/usePuterAuth.js
import { useState, useEffect } from 'react';

export const usePuterAuth = () => {
  const [puterUser, setPuterUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithPuter = async () => {
    try {
      // Vérifier si Puter.js est disponible
      if (!window.puter || !window.puter.auth) {
        throw new Error('Puter.js SDK non disponible');
      }

      // Authentification avec Puter
      const user = await window.puter.auth.signIn({
        // Options d'authentification
        permissions: ['user:read'],
      });
      
      setPuterUser(user);
      return user;
    } catch (error) {
      console.error('Erreur authentification Puter:', error);
      throw error;
    }
  };

  const signOutWithPuter = async () => {
    try {
      if (window.puter && window.puter.auth) {
        window.puter.auth.signOut();
      }
      setPuterUser(null);
    } catch (error) {
      console.error('Erreur déconnexion Puter:', error);
      throw error;
    }
  };

  const checkPuterSession = async () => {
    try {
      if (window.puter && window.puter.auth) {
        const user = window.puter.auth.user();
        if (user) {
          setPuterUser(user);
          return user;
        }
      }
      return null;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log('Aucune session Puter active');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPuterSession();
  }, []);

  return {
    puterUser,
    loading,
    signInWithPuter,
    signOutWithPuter,
    checkPuterSession,
  };
};