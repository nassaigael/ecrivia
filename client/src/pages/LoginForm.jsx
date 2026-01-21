// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import logo from '../assets/images/logo.jpeg';

const LoginForm = ({ setUserData, setIsLoggedIn, googleClientId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSuccess = (credentialResponse) => {
    setLoading(false);
    try {
      // Décodage JWT robuste pour UTF-8 (fix accents)
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const binaryString = atob(base64);
      const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
      const jsonPayload = new TextDecoder().decode(bytes);
      const payload = JSON.parse(jsonPayload);
      
      const userInfo = {
        id: payload.sub,
        name: payload.name || 'Utilisateur', // UTF-8 natif maintenant
        email: payload.email,
        picture: payload.picture || '',
      };
      console.log('User info décodé (UTF-8 safe):', userInfo); // Log pour vérifier accents
      setUserData(userInfo);
      setIsLoggedIn(true);
      localStorage.setItem('googleUser', JSON.stringify(userInfo)); // JSON gère UTF-8 auto
    } catch (err) {
      console.error('Erreur décodage token:', err);
      setError('Erreur lors de la connexion. Réessayez.');
    }
  };

  const handleError = () => {
    setLoading(false);
    setError('Connexion annulée ou échouée. Réessayez.');
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8 flex flex-col items-center gap-4">
              <img src={logo} width={55} height={55} className="rounded-2xl" alt="Logo EmailCraft AI" />
              <p className="text-gray-900 font-medium">Se connecter avec Google</p>
            </div>
            {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              theme="outline"
              size="large"
              text="Se connecter avec Google"
              disabled={loading}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;