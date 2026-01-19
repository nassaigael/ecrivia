import puter from '@heyputer/puter.js';

export const generateEmailWithPuter = async (formData) => {
  const { mainMessage, tone, language, recipientName, recipientGender, recipientTitle, replyToEmail } = formData;

  // Mapping des langues pour le prompt
  const langNames = {
    fr: 'français',
    en: 'anglais',
    es: 'espagnol',
    de: 'allemand',
    it: 'italien',
    pt: 'portugais',
    nl: 'néerlandais',
    sv: 'suédois',
    da: 'danois',
    no: 'norvégien',
    mg: 'malgache',
  };
  const targetLang = langNames[language] || 'français';

  // Mapping des tons
  const toneMap = {
    professionnel: 'professionnel',
    concis: 'concis',
    chaleureux: 'chaleureux',
    formel: 'formel',
    amical: 'amical',
  };
  const selectedTone = toneMap[tone] || 'professionnel';

  // Construction du prompt en français pour cohérence (l'IA gère bien les langues)
  let prompt = `Génère un email ${selectedTone} en ${targetLang} adressé à `;
  if (recipientName) {
    prompt += `${recipientName}. `;
    if (recipientGender !== 'non-specifie') {
      const genderPrefix = recipientGender === 'masculin' ? 'Monsieur' : 'Madame';
      prompt += `Utilise la salutation "${genderPrefix} ${recipientName}". `;
    }
  } else {
    prompt += 'le destinataire. ';
  }
  if (recipientTitle) {
    prompt += `Titre du destinataire : ${recipientTitle}. `;
  }
  prompt += `Le message principal à transmettre est : "${mainMessage}". `;

  if (replyToEmail.trim()) {
    prompt += `Ceci est une réponse à l'email suivant : "${replyToEmail}". Réponds de manière appropriée. `;
  }

  prompt += `Structure l'email comme suit : 
  - Objet clair et concis
  - Salutation personnalisée
  - Corps du message structuré et engageant
  - Fermeture polie
  - Signature simple (utilise un nom générique comme "Cordialement, [Ton Nom]").

  Retourne uniquement le texte complet de l'email, sans explications supplémentaires.`;

  try {
    const response = await puter.ai.chat(prompt, {
      model: 'gpt-4.1-nano', // Modèle gratuit et rapide ; alternatives : 'claude-sonnet-4', 'google/gemini-2.5-flash'
      stream: false, // Pas de streaming pour simplicité
    });
    return typeof response === 'string' ? response : response.message?.content?.[0]?.text || response; // Adaptation selon le modèle
  } catch (error) {
    console.error('Erreur Puter.js :', error);
    throw error;
  }
};