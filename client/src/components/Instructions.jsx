import React from 'react';
import { Edit3, Globe, Send } from 'lucide-react';

const Instructions = () => {
  return (
    <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-900 mb-3">Comment utiliser ECRIVIA</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            1
          </div>
          <div>
            <p className="font-medium mb-1 flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-blue-600" />
              Décrivez votre message principal et sélectionnez le ton souhaité
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            2
          </div>
          <div>
            <p className="font-medium mb-1 flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" />
              Choisissez la langue de sortie et renseignez les informations du destinataire
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            3
          </div>
          <div>
            <p className="font-medium mb-1 flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-600" />
              Générez votre e-mail avec Puter et copiez-le dans votre client de messagerie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;