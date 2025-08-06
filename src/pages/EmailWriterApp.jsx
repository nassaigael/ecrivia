import React, { useState, useRef } from 'react';
import { Copy, Mail, User, Globe, Send, LogIn, UserPlus, Bot, Sparkles } from 'lucide-react';
import logo from "../assets/images/logoEcrivia.jpeg";

const EmailWriterApp = () => {
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
    replyToEmail: ''
  });
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const textareaRef = useRef(null);

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
    { code: 'mg', flag: '🇲🇬', name: 'Malgache' } // 
  ];

  const tones = [
    { value: 'professionnel', label: 'Professionnel' },
    { value: 'concis', label: 'Concis' },
    { value: 'chaleureux', label: 'Chaleureux' },
    { value: 'formel', label: 'Formel' },
    { value: 'amical', label: 'Amical' }
  ];

  const genders = [
    { value: 'non-specifie', label: 'Non spécifié' },
    { value: 'masculin', label: 'Masculin' },
    { value: 'feminin', label: 'Féminin' },
    { value: 'neutre', label: 'Neutre' }
  ];

  // Génération d'e-mail avec Groq (version simplifiée avec fetch)
  const generateEmailWithGroq = async (data) => {
    const { mainMessage, tone, language, recipientName, recipientGender, recipientTitle, replyToEmail } = data;

    // Construction du prompt pour Groq
    const languageNames = {
      'fr': 'français',
      'en': 'English',
      'es': 'español',
      'de': 'Deutsch',
      'it': 'italiano',
      'pt': 'português',
      'nl': 'Nederlands',
      'sv': 'svenska',
      'da': 'dansk',
      'no': 'norsk',
      'mg': 'malgache'
    };

    const toneDescriptions = {
      'professionnel': 'profesionnel et courtois',
      'concis': 'concis et direct',
      'chaleureux': 'chaleureux et amical',
      'formel': 'très formel et respectueux',
      'amical': 'amical et décontracté'
    };

    let prompt = `Écris un email ${toneDescriptions[tone]} en ${languageNames[language]} avec les informations suivantes :

Message principal : ${mainMessage}

${recipientName ? `Destinataire : ${recipientTitle ? recipientTitle + ' ' : ''}${recipientName}` : ''}
${recipientGender !== 'non-specifie' ? `Genre : ${recipientGender}` : ''}

${replyToEmail ? `En réponse à cet email :\n${replyToEmail}\n` : ''}

Génère uniquement le contenu de l'email avec :
- Une formule de politesse adaptée
- Le corps du message bien structuré  
- Une formule de clôture appropriée
- [Votre nom] à la fin

Réponds uniquement avec le contenu de l'email, sans explications.`;

    try {
      // Remplacez "VOTRE_CLÉ_API_GROQ_ICI" par votre clé API Groq réelle
      const apiKey = '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';

      // Conversion du fichier .env en variable directe
      const GROQ_API_KEY = apiKey || process.env.GROQ_API_KEY;

      // Configuration requête
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Modèle Llama 3 de 70B pour une meilleure qualité
          model: 'llama3-70b-8192',
          messages: [{ role: 'user', content: prompt }],
          temperature: 1.5,
          max_tokens: 5000,
          // Streaming désactivé pour plus de simplicité
          stream: false
        })
      });

      // Vérification de la réponse
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Erreur API Groq:', response.status, errorDetails);
        throw new Error(`Erreur API (${response.status}): ${errorDetails}`);
      }

      const result = await response.json();

      // Extraction du contenu généré
      const generatedText = result.choices[0]?.message?.content?.trim() || '';

      if (!generatedText) {
        throw new Error('Aucun contenu généré par l\'API');
      }

      return generatedText;

    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      return generateFallbackEmail(data);
    }
  };

  // Fonction de fallback en cas d'erreur API
  const generateFallbackEmail = (data) => {
    const { mainMessage, tone, language, recipientName, recipientTitle } = data;

    const templates = {
      fr: {
        professionnel: {
          greeting: recipientName ? `Madame/Monsieur ${recipientName},` : 'Madame, Monsieur,',
          body: `J'espère que ce message vous trouve en bonne santé.\n\n${mainMessage}\n\nJe reste à votre disposition pour tout complément d'information.`,
          closing: 'Cordialement,'
        },
        concis: {
          greeting: recipientName ? `Bonjour ${recipientName},` : 'Bonjour,',
          body: mainMessage,
          closing: 'Cordialement,'
        },
        chaleureux: {
          greeting: recipientName ? `Cher/Chère ${recipientName},` : 'Bonjour,',
          body: `J'espère que vous allez bien.\n\n${mainMessage}\n\nAu plaisir de vous lire bientôt.`,
          closing: 'Bien à vous,'
        },
        formel: {
          greeting: recipientName ? `${recipientTitle ? recipientTitle + ' ' : ''}${recipientName},` : 'Madame, Monsieur,',
          body: `J'ai l'honneur de vous écrire concernant :\n\n${mainMessage}\n\nVeuillez agréer mes salutations distinguées.`,
          closing: 'Respectueusement,'
        }
      },
      mg: {
        professionnel: {
          greeting: recipientName ? `Madame, Monsieur,` : 'Madame, Monsieur,',
          body: `${mainMessage}\n\nNandàra anao ny fahatsiarovanao.\n\nMiala tsiny,`,
          closing: '[Anaranao]'
        },
        concis: {
          greeting: recipientName ? `Salama,` : 'Salama,',
          body: `${mainMessage}\n\nMiala tsiny,`,
          closing: '[Anaranao]'
        },
        chaleureux: {
          greeting: recipientName ? `Salama,` : 'Salama,',
          body: `${mainMessage}\n\nMisaotra ny fahaliananareo.\n\nMiala tsiny,`,
          closing: '[Anaranao]'
        },
        formel: {
          greeting: recipientName ? `Madame, Monsieur,` : 'Madame, Monsieur,',
          body: `Mametraka antso ianao ara-tekinika momba ny : ${mainMessage}\n\nNandàra fa nihaino ity resaka ity.\n\nMiala tsiny,`,
          closing: '[Anaranao]'
        }
      },

      en: {
        professionnel: {
          greeting: recipientName ? `Dear ${recipientName},` : 'Dear Sir/Madam,',
          body: `I hope this email finds you well.\n\n${mainMessage}\n\nPlease don't hesitate to contact me if you need any additional information.`,
          closing: 'Best regards,'
        }
      }
    };

    const template = templates[language]?.[tone] || templates.fr.professionnel;
    return `${template.greeting}\n\n${template.body}\n\n${template.closing}\n\n[Votre nom]`;
  };

  const handleGoogleLogin = () => {
    // Simulation de connexion Google
    setUserData({ name: 'Utilisateur Google', email: 'user@gmail.com' });
    setIsLoggedIn(true);
  };

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

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">EmailCraft AI</h1>
              <p className="text-gray-600">Rédigez des e-mails parfaits avec Groq</p>
            </div>

            {!showSignup ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                    id="login-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    id="login-password"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const email = document.getElementById('login-email').value;
                    const password = document.getElementById('login-password').value;
                    if (email && password) {
                      setUserData({ name: email.split('@')[0], email });
                      setIsLoggedIn(true);
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Se connecter
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jean Dupont"
                    id="signup-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                    id="signup-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    id="signup-password"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const name = document.getElementById('signup-name').value;
                    const email = document.getElementById('signup-email').value;
                    const password = document.getElementById('signup-password').value;
                    if (name && email && password) {
                      setUserData({ name, email });
                      setIsLoggedIn(true);
                      setShowSignup(false);
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-5 w-5" />
                  Créer un compte
                </button>
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuer avec Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowSignup(!showSignup)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {showSignup ? 'Déjà un compte ? Se connecter' : 'Nouveau ? Créer un compte'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} width={55} height={55} className='rounded-2xl'/>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EmailCraft AI</h1>
                  <p className="text-sm text-gray-600">Rédaction d'e-mails avec Groq (Llama 3)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Bonjour, {userData.name}</span>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de saisie */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-600" />
              Composer votre e-mail
            </h2>

            <div className="space-y-6">
              {/* Message principal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message principal *
                </label>
                <textarea
                  value={formData.mainMessage}
                  onChange={(e) => setFormData({ ...formData, mainMessage: e.target.value })}
                  placeholder="Décrivez le message que vous souhaitez transmettre..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>

              {/* Ton et Langue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ton de l'e-mail
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {tones.map((tone) => (
                      <option key={tone.value} value={tone.value}>
                        {tone.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Langue de sortie
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Informations sur le destinataire */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  Informations sur le destinataire
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du destinataire
                    </label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                      placeholder="Marie Dubois, M. Martin..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Genre
                    </label>
                    <select
                      value={formData.recipientGender}
                      onChange={(e) => setFormData({ ...formData, recipientGender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {genders.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre/Poste
                  </label>
                  <input
                    type="text"
                    value={formData.recipientTitle}
                    onChange={(e) => setFormData({ ...formData, recipientTitle: e.target.value })}
                    placeholder="Directeur RH, Dr., Prof..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* E-mail de réponse (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail auquel vous répondez (optionnel)
                </label>
                <textarea
                  value={formData.replyToEmail}
                  onChange={(e) => setFormData({ ...formData, replyToEmail: e.target.value })}
                  placeholder="Collez ici l'e-mail original si vous répondez à un message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <button
                onClick={handleGenerateEmail}
                disabled={!formData.mainMessage.trim() || isGenerating}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Générer l'e-mail
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Résultat généré */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Send className="h-6 w-6 text-green-600" />
                E-mail généré
              </h2>
              {generatedEmail && (
                <button
                  onClick={handleCopyToClipboard}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${copySuccess
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Copy className="h-4 w-4" />
                  {copySuccess ? 'Copié !' : 'Copier'}
                </button>
              )}
            </div>

            {generatedEmail ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <textarea
                  ref={textareaRef}
                  value={generatedEmail}
                  onChange={(e) => setGeneratedEmail(e.target.value)}
                  className="w-full bg-transparent border-none resize-none focus:outline-none text-gray-800 leading-relaxed"
                  rows={15}
                  placeholder="Votre e-mail généré apparaîtra ici..."
                />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">Aucun e-mail généré pour le moment</p>
                <p className="text-sm text-gray-500">
                  Remplissez le formulaire et cliquez sur "Générer l'e-mail" pour commencer
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions d'utilisation */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Comment utiliser EmailCraft AI avec Groq</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <p>Décrivez votre message principal et sélectionnez le ton souhaité</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <p>Choisissez la langue de sortie et renseignez les informations du destinataire</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <p>Générez votre e-mail avec Groq et copiez-le dans votre client de messagerie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailWriterApp;

// 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

