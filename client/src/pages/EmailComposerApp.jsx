import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import Header from '../components/Header';
import LoginForm from './LoginForm';
import EmailForm from '../components/EmailForm';
import GeneratedEmail from '../components/GeneratedEmail';
import Instructions from '../components/Instructions';
import { generateEmailWithPuter } from '../utils/generateEmailWithPuter';

const EmailComposerApp = ({ googleClientId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        parsedUser.name = parsedUser.name || 'Utilisateur';
        console.log('User loaded from localStorage (UTF-8):', parsedUser);
        setUserData(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Erreur chargement user:', error);
        localStorage.removeItem('googleUser');
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    mainMessage: '',
    tone: 'professionnel',
    language: 'fr',
    recipientName: '',
    recipientGender: 'non-specifie',
    recipientTitle: '',
    replyToEmail: '',
  });

  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' },
    { code: 'pt', flag: '🇵🇹', name: 'Português' },
    { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
    { code: 'sv', flag: '🇸🇪', name: 'Svenska' },
    { code: 'da', flag: '🇩🇰', name: 'Dansk' },
    { code: 'no', flag: '🇳🇴', name: 'Norsk' },
    { code: 'mg', flag: '🇲🇬', name: 'Malgache' },
  ];

  const tones = [
    { value: 'professionnel', label: 'Professionnel' },
    { value: 'concis', label: 'Concis' },
    { value: 'chaleureux', label: 'Chaleureux' },
    { value: 'formel', label: 'Formel' },
    { value: 'amical', label: 'Amical' },
  ];

  const genders = [
    { value: 'non-specifie', label: 'Non spécifié' },
    { value: 'masculin', label: 'Masculin' },
    { value: 'feminin', label: 'Féminin' },
    { value: 'neutre', label: 'Neutre' },
  ];

  const handleGenerateEmail = async () => {
    if (!formData.mainMessage.trim()) {
      setAuthError('Veuillez entrer un message principal');
      return;
    }
    if (!isLoggedIn) {
      setAuthError('Veuillez vous connecter pour générer un email.');
      return;
    }
    setIsGenerating(true);
    setGeneratedEmail('');
    setAuthError('');
    try {
      const email = await generateEmailWithPuter(formData);
      setGeneratedEmail(email);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      setAuthError('Erreur génération. Réessayez.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('googleUser');
    setUserData({ name: '', email: '' });
    setIsLoggedIn(false);
    setAuthError('');
    console.log('Logout effectué.');
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  if (!isLoggedIn) {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        <>
          {authError && (
            <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50">
              {authError}
              <button onClick={() => setAuthError('')} className="ml-2">×</button>
            </div>
          )}
          <LoginForm
            setUserData={setUserData}
            setIsLoggedIn={setIsLoggedIn}
            googleClientId={googleClientId}
          />
        </>
      </GoogleOAuthProvider>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
        {authError && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50">
            {authError}
            <button onClick={() => setAuthError('')} className="ml-2">×</button>
          </div>
        )}
        <Header userData={userData} logout={handleLogout} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EmailForm
              formData={formData}
              setFormData={setFormData}
              handleGenerateEmail={handleGenerateEmail}
              isGenerating={isGenerating}
              tones={tones}
              languages={languages}
              genders={genders}
            />
            <GeneratedEmail
              generatedEmail={generatedEmail}
              setGeneratedEmail={setGeneratedEmail}
              copySuccess={copySuccess}
              setCopySuccess={setCopySuccess}
            />
          </div>
          <Instructions />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default EmailComposerApp;