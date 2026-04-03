import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 1, repeat: Infinity, ease: "linear" }
    }
  };

  if (!puterInitialized) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "#f5e6ea" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            variants={loadingVariants}
            animate="animate"
            className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{
              background: "#f0e2e6",
              boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
            }}
          >
            <Loader2 className="h-8 w-8" style={{ color: "#c23b78" }} />
          </motion.div>
          <p className="font-medium" style={{ color: "#c23b78" }}>Chargement de Puter.js...</p>
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <AnimatePresence>
          {authError && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl"
              style={{
                background: "#f0e2e6",
                boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
                border: "1px solid rgba(194,59,120,0.3)"
              }}
            >
              <div
                className="rounded-full p-1"
                style={{
                  background: "#e06a9e",
                  boxShadow: "inset 2px 2px 4px #b84a7a, inset -2px -2px 4px #ff8aba"
                }}
              >
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold" style={{ color: "#c23b78" }}>{authError}</span>
              <button
                onClick={() => setAuthError('')}
                className="ml-2 text-sm font-bold"
                style={{ color: "#c23b78" }}
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <LoginForm
          setUserData={setUserData}
          setIsLoggedIn={setIsLoggedIn}
        />
      </>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f5e6ea" }}
    >
      <AnimatePresence>
        {authError && (
          <motion.div
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl"
            style={{
              background: "#f0e2e6",
              boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
              border: "1px solid rgba(194,59,120,0.3)"
            }}
          >
            <div
              className="rounded-full p-1"
              style={{
                background: "#e06a9e",
                boxShadow: "inset 2px 2px 4px #b84a7a, inset -2px -2px 4px #ff8aba"
              }}
            >
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold" style={{ color: "#c23b78" }}>{authError}</span>
            <button
              onClick={() => setAuthError('')}
              className="ml-2 text-sm font-bold"
              style={{ color: "#c23b78" }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Header userData={userData} logout={handleLogout} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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
      </motion.div>
    </div>
  );
};

export default EmailComposerApp;