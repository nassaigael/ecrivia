import logo from '../assets/images/logo.jpeg'

const LoginForm = ({ setUserData, setIsLoggedIn, setShowSignup }) => {
  const handleGoogleLogin = () => {
    setUserData({ name: 'Utilisateur Google', email: 'user@gmail.com' });
    setIsLoggedIn(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (email && password) {
      setUserData({ name: email.split('@')[0], email });
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--accent-color)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 border">
          <div className="text-center mb-8 flex justify-center items-center flex-col gap-4">
            <img src={logo} width={55} height={55} className='rounded-2xl' alt="Logo" />
            <p className="text-[var(--text-color)]  ">Se connecter à votre compte</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">Adresse e-mail</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg peer focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] focus:border-transparent text-[var(--accent-color)] "
                placeholder="votre@email.com"
                id="login-email"
              />
            </div>
            <div>
              <label className="pl-4 block text-sm font-medium text-[var(--accent-color)] mb-2">Mot de passe</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-[var(--accent-color)] rounded-lg peer focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] focus:border-transparent text-[var(--accent-color)] "
                placeholder="y0uR pa$$Word"
                id="login-password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="cursor-pointer capitalize w-full bg-[var(--primary-color)] text-[var(--accent-color)] py-3 px-4 rounded-lg hover:bg-[var(--hover-color)] transition-colors font-medium flex items-center justify-center gap-2"
            >
              se connecter
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--accent-color)] " />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--bg-color)] text-[var(--accent-color)] ">ou</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="cursor-pointer mt-4 w-full bg-[var(--hover-color)] text-[var(--accent-color)] py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#ffb6c1" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#ffb6c1" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#ffb6c1" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#ffb6c1" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuer avec Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSignup(true)}
              className=' text-[var(--accent-color)] '
            >
               Pas de compte ? <span className=' text-[var(--primary-color)] hover:text-[var(--hover-color)] '>Créer un</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;