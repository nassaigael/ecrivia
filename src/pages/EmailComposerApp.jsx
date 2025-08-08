// src/App.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SingupForm';
import EmailForm from '../components/EmailForm';
import GeneratedEmail from '../components/GeneratedEmail';
import Instructions from '../components/Instructions';
import { generateEmailWithGroq } from '../utils/generateEmailWithGroq';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
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
    if (!formData.mainMessage.trim()) return;

    setIsGenerating(true);
    try {
      const email = await generateEmailWithGroq(formData);
      setGeneratedEmail(email);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isLoggedIn) {
    return showSignup ? (
      <SignupForm setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} />
    ) : (
      <LoginForm setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <Header userData={userData} setIsLoggedIn={setIsLoggedIn} />
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

export default App;