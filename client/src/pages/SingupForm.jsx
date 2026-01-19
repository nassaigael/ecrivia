import React from 'react';
import { UserPlus } from 'lucide-react';
import logo from '../assets/images/logo.jpeg';

const SignupForm = ({ setUserData, setIsLoggedIn, setShowSignup }) => {
  const handleSignup = (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    if (name && email && password) {
      setUserData({ name, email });
      setIsLoggedIn(true);
      setShowSignup(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8 flex justify-center items-center flex-col gap-4">
            <img src={logo} width={55} height={55} className="rounded-2xl" alt="Logo" />
            <p className="text-gray-900 font-medium">Créer votre compte</p>
          </div>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="pl-4 block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Jean Dupont"
                id="signup-name"
              />
            </div>
            <div>
              <label className="pl-4 block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="votre@email.com"
                id="signup-email"
              />
            </div>
            <div>
              <label className="pl-4 block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="y0uR pa$$Word"
                id="signup-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Créer un compte
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSignup(false)}
              className="text-gray-700 font-medium"
            >
              Déjà un compte ? <span className="text-blue-600 hover:text-blue-700">Se connecter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;