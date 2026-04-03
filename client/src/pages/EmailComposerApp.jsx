import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LoginForm from './Login';
import EmailForm from '../components/EmailForm';
import GeneratedEmail from '../components/GeneratedEmail';
import Instructions from '../components/Instructions';
import { generateEmailWithPuter } from '../utils/generateEmailWithPuter';

const EmailComposerApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    picture: ''
  });
  const [authError, setAuthError] = useState('');
  const [puterInitialized, setPuterInitialized] = useState(false);

  useEffect(() => {
    const initPuter = async () => {
      if (typeof window !== 'undefined' && !window.puter) {
        try {
          const script = document.createElement('script');
          script.src = 'https://js.puter.com/v2/';
          script.async = true;
          script.onload = () => {
            console.log('Puter.js SDK chargé');
            window.puter.init({ appID: 'ecrivia' });
            setPuterInitialized(true);
          };
          document.head.appendChild(script);
        } catch (error) {
          console.error('Erreur chargement Puter.js:', error);
          setPuterInitialized(false);
        }
      } else if (window.puter) {
        setPuterInitialized(true);
      }
    };

    initPuter();
  }, []);

  useEffect(() => {
    if (!puterInitialized) return;

    const savedUser = localStorage.getItem('puterUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUserData(parsedUser);
        setIsLoggedIn(true);
        console.log('Utilisateur Puter chargé depuis localStorage');
      } catch (error) {
        console.error('Erreur chargement user Puter:', error);
        localStorage.removeItem('puterUser');
      }
    }
  }, [puterInitialized]);

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
      setAuthError('Veuillez vous connecter avec Puter pour générer un email.');
      return;
    }

    setIsGenerating(true);
    setGeneratedEmail('');
    setAuthError('');

    try {
      const emailData = {
        ...formData,
        userName: userData.name || userData.username,
      };

      const email = await generateEmailWithPuter(emailData);
      setGeneratedEmail(email);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      setAuthError('Erreur génération. Réessayez ou vérifiez votre connexion Puter.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    console.log('Déconnexion Puter en cours...');

    localStorage.removeItem('puterUser');

    setUserData({ name: '', email: '', username: '', picture: '' });
    setIsLoggedIn(false);
    setAuthError('');
    setGeneratedEmail('');

    setFormData({
      mainMessage: '',
      tone: 'professionnel',
      language: 'fr',
      recipientName: '',
      recipientGender: 'non-specifie',
      recipientTitle: '',
      replyToEmail: '',
    });

    console.log('Déconnexion application réussie');

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  if (!puterInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de Puter.js...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        {authError && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50 shadow-lg">
            <div className="flex items-center justify-between">
              <span>{authError}</span>
              <button
                onClick={() => setAuthError('')}
                className="ml-3 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <LoginForm
          setUserData={setUserData}
          setIsLoggedIn={setIsLoggedIn}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {authError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50 shadow-lg">
          <div className="flex items-center justify-between">
            <span>{authError}</span>
            <button
              onClick={() => setAuthError('')}
              className="ml-3 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
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
  );
};

export default EmailComposerApp;