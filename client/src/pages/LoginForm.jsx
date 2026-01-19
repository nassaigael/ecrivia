import React, { useState } from 'react';
import logo from '../assets/images/logo.jpeg';
import { puter } from "@heyputer/puter.js";

const LoginForm = ({ setUserData, setIsLoggedIn, setShowSignup }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Pour les messages d'erreur

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset erreur

    try {
      // Ouvre la popup Puter pour login/inscription
      const result = await puter.auth.signIn();

      if (result.success) {
        // Récupère les infos user
        const user = await puter.auth.getUser();
        const userInfo = {
          id: user.id,
          name: user.name || 'Utilisateur',
          email: user.email,
          avatar: user.avatar, // Optionnel pour le Header
        };

        // Met à jour l'état de l'app
        setUserData(userInfo);
        setIsLoggedIn(true);

        // Persistance optionnelle (survit au refresh)
        localStorage.setItem('puterUser', JSON.stringify(userInfo));

        console.log('Login réussi ! User:', userInfo);
        // Redirige vers la page de génération (géré par EmailComposerApp)
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
    <div className="min-h-screen bg-[var(--accent-color)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 border">
          <div className="text-center mb-8 flex flex-col items-center gap-4">
            <img src={logo} width={55} height={55} className="rounded-2xl" alt="Logo" />
            <p className="text-[var(--text-color)]">Se connecter à votre compte</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email optionnel : Pré-rempli si persistant */}
            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">
                Adresse e-mail (optionnel, gérée par Puter)
              </label>
              <input
                type="email"
                name="email"
                disabled={loading}
                placeholder="votre@email.com (automatique via Puter)"
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] text-[var(--accent-color)] bg-gray-100"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-color)] text-[var(--accent-color)] py-3 rounded-lg hover:bg-[var(--hover-color)] transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
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
              className="text-[var(--accent-color)] font-medium"
              disabled={loading}
            >
              Pas de compte ? <span className="text-[var(--primary-color)] hover:text-[var(--hover-color)]">Créer un</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;