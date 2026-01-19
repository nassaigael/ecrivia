import React, { useState } from 'react';
import logo from '../assets/images/logo.jpeg';
import { puter } from "@heyputer/puter.js";

const LoginForm = ({ setUserData, setIsLoggedIn, setShowSignup }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await puter.auth.signIn();
      if (result.success) {
        const user = await puter.auth.getUser();
        const userInfo = {
          id: user.id,
          name: user.name || 'Utilisateur',
          email: user.email,
          avatar: user.avatar,
        };
        setUserData(userInfo);
        setIsLoggedIn(true);
        localStorage.setItem('puterUser', JSON.stringify(userInfo));
        console.log('Login réussi ! User:', userInfo);
      } else {
        setError('Connexion annulée par l\'utilisateur.');
      }
    } catch (err) {
      console.error('Erreur Puter auth:', err);
      setError('Erreur de connexion. Vérifiez votre réseau ou réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8 flex flex-col items-center gap-4">
            <img src={logo} width={55} height={55} className="rounded-2xl" alt="Logo" />
            <p className="text-gray-900 font-medium">Se connecter à votre compte</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="pl-4 block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail (optionnel, gérée par Puter)
              </label>
              <input
                type="email"
                name="email"
                disabled={loading}
                placeholder="votre@email.com (automatique via Puter)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-100"
              />
            </div>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Connexion en cours...
                </>
              ) : (
                'Se connecter avec Puter'
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSignup(true)}
              className="text-gray-700 font-medium"
              disabled={loading}
            >
              Pas de compte ? <span className="text-blue-600 hover:text-blue-700">Créer un</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;