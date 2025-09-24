// src/utils/generateEmailWithGroq.js
import { generateFallbackEmail } from './generateFallbackEmail';

const generateEmailWithGroq = async (data) => {
  const { mainMessage, tone, language, recipientName, recipientGender, recipientTitle, replyToEmail } = data;

  const languageNames = {
    fr: 'français',
    en: 'English',
    es: 'español',
    de: 'Deutsch',
    it: 'italiano',
    pt: 'português',
    nl: 'Nederlands',
    sv: 'svenska',
    da: 'dansk',
    no: 'norsk',
    mg: 'malgache',
  };

  const toneDescriptions = {
    professionnel: 'profesionnel et courtois',
    concis: 'concis et direct',
    chaleureux: 'chaleureux et amical',
    formel: 'très formel et respectueux',
    amical: 'amical et décontracté',
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
    const apiKey = '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';
    const GROQ_API_KEY = apiKey || process.env.GROQ_API_KEY;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 1.5,
        max_tokens: 5000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Erreur API Groq:', response.status, errorDetails);
      throw new Error(`Erreur API (${response.status}): ${errorDetails}`);
    }

    const result = await response.json();
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

export { generateEmailWithGroq };