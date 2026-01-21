import puter from '@heyputer/puter.js';

export const generateEmailWithPuter = async (formData) => {
  const { mainMessage, tone, language, length, recipientName, recipientGender, recipientTitle, replyToEmail } = formData;

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

  const toneMap = {
    professionnel: 'professionnel',
    concis: 'concis',
    chaleureux: 'chaleureux',
    formel: 'formel',
    amical: 'amical',
  };
  const selectedTone = toneMap[tone] || 'professionnel';

  const lengthMap = {
    short: 'court et concis (moins de 150 mots)',
    medium: 'moyen (150-300 mots)',
    long: 'long et détaillé (plus de 300 mots)',
  };
  const selectedLength = lengthMap[length] || lengthMap.medium;

  let prompt = `Génère un email ${selectedTone} et ${selectedLength} en ${targetLang} adressé à `;
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
  - Corps du message structuré et engageant (adapte la longueur au ${selectedLength})
  - Fermeture polie
  - Signature simple (utilise un nom générique comme "Cordialement, [Ton Nom]").

  Retourne uniquement le texte complet de l'email, sans explications supplémentaires.`;

  try {
    const response = await puter.ai.chat(prompt, {
      model: 'gpt-4.1-nano',
      stream: false,
    });
    return typeof response === 'string' ? response : response.message?.content?.[0]?.text || response;
  } catch (error) {
    console.error('Erreur Puter.js :', error);
    throw error;
  }
};