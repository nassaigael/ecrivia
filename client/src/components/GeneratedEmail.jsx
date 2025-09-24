// src/components/GeneratedEmail.jsx
import React, { useRef } from 'react';
import { Send, Copy, Mail } from 'lucide-react';

const GeneratedEmail = ({ generatedEmail, setGeneratedEmail, copySuccess, setCopySuccess }) => {
  const textareaRef = useRef(null);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Send className="h-6 w-6 text-green-600" />
          E-mail généré
        </h2>
        {generatedEmail && (
          <button
            onClick={handleCopyToClipboard}
            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
              copySuccess ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
  );
};

export default GeneratedEmail;