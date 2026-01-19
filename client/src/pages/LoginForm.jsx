import logo from '../assets/images/logo.jpeg';
import { auth, provider } from '../firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const LoginForm = ({ setUserData, setIsLoggedIn, setShowSignup }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUserData({
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL,
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erreur Google login :', error);
      alert('Erreur lors de la connexion avec Google');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      setUserData({
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erreur login email/password :', error);
      alert('Email ou mot de passe incorrect.');
    }
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

          <div className="mt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--accent-color)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--bg-color)] text-[var(--accent-color)]">
                  ou
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-[var(--hover-color)] text-[var(--accent-color)] py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              Continuer avec Google
            </button>
          </div>

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
