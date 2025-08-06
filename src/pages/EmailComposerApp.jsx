import React, { useState, useRef } from 'react';
import { Mail, Copy, Send, User, Globe, Briefcase, MessageSquare, FileText, Settings, LogIn, UserPlus } from 'lucide-react';

const EmailComposerApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  // Form states
  const [coreMessage, setCoreMessage] = useState('');
  const [emailTone, setEmailTone] = useState('professional');
  const [replyToEmail, setReplyToEmail] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [recipientName, setRecipientName] = useState('');
  const [recipientGender, setRecipientGender] = useState('not-specified');
  const [recipientTitle, setRecipientTitle] = useState('');
  
  // Generated email states
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Auth form states
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

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
    { code: 'no', flag: '🇳🇴', name: 'Norsk' }
  ];

  const tones = [
    { value: 'professional', label: 'Professionnel', description: 'Ton formel et respectueux' },
    { value: 'friendly', label: 'Amical', description: 'Ton chaleureux et accessible' },
    { value: 'concise', label: 'Concis', description: 'Direct et bref' },
    { value: 'formal', label: 'Formel', description: 'Très officiel et protocolaire' },
    { value: 'warm', label: 'Chaleureux', description: 'Bienveillant et empathique' }
  ];

  const genderOptions = [
    { value: 'not-specified', label: 'Non spécifié' },
    { value: 'male', label: 'Masculin' },
    { value: 'female', label: 'Féminin' },
    { value: 'neutral', label: 'Neutre' }
  ];

  // Mock authentication functions
  const handleGoogleLogin = () => {
    // Simulate Google login
    setUser({ name: 'Utilisateur Google', email: 'user@gmail.com', provider: 'google' });
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  const handleEmailAuth = () => {
    if (authMode === 'register') {
      // Simulate registration
      setUser({ name: authName, email: authEmail, provider: 'email' });
    } else {
      // Simulate login
      setUser({ name: 'Utilisateur', email: authEmail, provider: 'email' });
    }
    setIsLoggedIn(true);
    setShowAuth(false);
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const generateEmail = async () => {
    if (!coreMessage.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const selectedLang = languages.find(lang => lang.code === selectedLanguage);
      
      const prompt = `Tu es un assistant expert en rédaction d'emails professionnels. 
      
Génère un email dans la langue suivante: ${selectedLang.name}

Paramètres:
- Message principal à transmettre: "${coreMessage}"
- Ton souhaité: ${emailTone}
- Langue de sortie: ${selectedLang.name}
${recipientName ? `- Nom du destinataire: ${recipientName}` : ''}
${recipientTitle ? `- Titre/Poste du destinataire: ${recipientTitle}` : ''}
${recipientGender !== 'not-specified' ? `- Genre pour adaptation linguistique: ${recipientGender}` : ''}
${replyToEmail ? `- En réponse à cet email: "${replyToEmail}"` : ''}

Instructions:
1. Rédige un email complet avec objet, salutation, corps et formule de politesse
2. Adapte le registre de langue selon le ton choisi
3. Utilise les informations du destinataire pour personnaliser l'email
4. Respecte les conventions linguistiques et culturelles de la langue choisie
5. Si c'est une réponse, fais référence à l'email original de manière appropriée

Format de réponse:
Objet: [Objet de l'email]

[Corps de l'email complet]`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      const emailContent = data.content[0].text;
      setGeneratedEmail(emailContent);
      
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      setGeneratedEmail("Désolé, une erreur s'est produite lors de la génération de l'email. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">EmailCraft AI</h1>
              <p className="text-gray-600">Rédigez des emails professionnels avec l'IA</p>
            </div>

            {!showAuth ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  Connectez-vous pour commencer
                </h2>
                
                <button
                  onClick={handleGoogleLogin}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg mb-4 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuer avec Google
                </button>

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => { setShowAuth(true); setAuthMode('login'); }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-5 h-5" />
                    Se connecter avec email
                  </button>
                  
                  <button
                    onClick={() => { setShowAuth(true); setAuthMode('register'); }}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Créer un compte
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <button
                  onClick={() => setShowAuth(false)}
                  className="mb-4 text-blue-600 hover:text-blue-700 text-sm"
                >
                  ← Retour
                </button>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {authMode === 'login' ? 'Connexion' : 'Créer un compte'}
                </h2>

                <div className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleEmailAuth}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    {authMode === 'login' ? 'Se connecter' : 'Créer le compte'}
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    {authMode === 'login' 
                      ? "Pas de compte ? Créer un compte" 
                      : "Déjà un compte ? Se connecter"
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EmailCraft AI</h1>
                <p className="text-sm text-gray-600">Assistant de rédaction d'emails</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Composez votre email
              </h2>

              {/* Language Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Langue de l'email
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`p-3 rounded-lg border-2 transition-colors text-left ${
                        selectedLanguage === lang.code
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="ml-2 text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message principal à transmettre *
                </label>
                <textarea
                  value={coreMessage}
                  onChange={(e) => setCoreMessage(e.target.value)}
                  placeholder="Décrivez le message principal que vous souhaitez transmettre..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  required
                />
              </div>

              {/* Email Tone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ton de l'email
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setEmailTone(tone.value)}
                      className={`p-3 rounded-lg border-2 transition-colors text-left ${
                        emailTone === tone.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{tone.label}</div>
                      <div className="text-sm text-gray-600">{tone.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply to Email (Optional) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  En réponse à cet email (optionnel)
                </label>
                <textarea
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  placeholder="Collez ici l'email auquel vous répondez..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Recipient Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Informations du destinataire
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du destinataire (optionnel)
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="ex: Marie Dubois, M. Martin, Dr. Laurent"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre (pour adaptation linguistique)
                  </label>
                  <select
                    value={recipientGender}
                    onChange={(e) => setRecipientGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Titre/Poste (optionnel)
                  </label>
                  <input
                    type="text"
                    value={recipientTitle}
                    onChange={(e) => setRecipientTitle(e.target.value)}
                    placeholder="ex: Directeur RH, Chef de projet, Dr., Prof."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateEmail}
              disabled={!coreMessage.trim() || isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Générer l'email
                </>
              )}
            </button>
          </div>

          {/* Generated Email Output */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Email généré
              </h2>
              {generatedEmail && (
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    copySuccess
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  {copySuccess ? 'Copié !' : 'Copier'}
                </button>
              )}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-96">
              {generatedEmail ? (
                <div className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
                  {generatedEmail}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-gray-500">
                  <Mail className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-2">Aucun email généré</p>
                  <p className="text-center">
                    Remplissez le formulaire et cliquez sur "Générer l'email" pour commencer
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposerApp;