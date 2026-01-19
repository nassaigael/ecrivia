import logo from '../assets/images/logo.jpeg';

const LoginForm = ({ setShowSignup }) => {
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log('Email :', email);
    console.log('Mot de passe :', password);

    alert('Connexion simulée (aucune authentification active)');
  };

  return (
    <div className="min-h-screen bg-[var(--accent-color)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 border">
          <div className="text-center mb-8 flex flex-col items-center gap-4">
            <img
              src={logo}
              width={55}
              height={55}
              className="rounded-2xl"
              alt="Logo"
            />
            <p className="text-[var(--text-color)]">
              Se connecter à votre compte
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] text-[var(--accent-color)]"
              />
            </div>

            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="y0uR pa$$Word"
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] text-[var(--accent-color)]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] text-[var(--accent-color)] py-3 rounded-lg hover:bg-[var(--hover-color)] transition-colors font-medium"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSignup(true)}
              className="text-[var(--accent-color)]"
            >
              Pas de compte ?{' '}
              <span className="text-[var(--primary-color)] hover:text-[var(--hover-color)]">
                Créer un
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
