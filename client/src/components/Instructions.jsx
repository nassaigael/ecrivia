// src/components/Instructions.jsx
import React from 'react';

const Instructions = () => {
  return (
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
  );
};

export default Instructions;