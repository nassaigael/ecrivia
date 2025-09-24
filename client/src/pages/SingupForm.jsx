import React from 'react';
import { UserPlus } from 'lucide-react';
import logo from '../assets/images/logo.jpeg'

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
    <div className="min-h-screen bg-[var(--accent-color)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-center mb-8 flex justify-center items-center flex-col gap-4">
              <img src={logo} width={55} height={55} className='rounded-2xl' alt="Logo" />
              <p className="text-[var(--text-color)]  ">Créer votre compte</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">Nom complet</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg peer focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] focus:border-transparent text-[var(--accent-color)] "
                placeholder="Jean Dupont"
                id="signup-name"
              />
            </div>
            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">Adresse e-mail</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg peer focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] focus:border-transparent text-[var(--accent-color)] "
                placeholder="votre@email.com"
                id="signup-email"
              />
            </div>
            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">Mot de passe</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg peer focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] focus:border-transparent text-[var(--accent-color)] "
                placeholder="y0uR pa$$Word"
                id="signup-password"
              />
            </div>
            <button
              onClick={handleSignup}
              className="cursor-pointer  w-full bg-[var(--primary-color)] text-[var(--accent-color)] py-3 px-4 rounded-lg hover:bg-[var(--hover-color)] transition-colors font-medium flex items-center justify-center gap-2"
            >
              Créer un compte
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSignup(false)}
              className="text-[var(--accent-color)] font-medium"
            >
              Déjà un compte ?  <span className=' text-[var(--primary-color)] hover:text-[var(--hover-color)] '>Se connecter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;