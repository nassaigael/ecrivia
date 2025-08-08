// src/utils/generateFallbackEmail.js
const generateFallbackEmail = (data) => {
  const { mainMessage, tone, language, recipientName, recipientTitle } = data;

  const templates = {
    fr: {
      professionnel: {
        greeting: recipientName ? `Madame/Monsieur ${recipientName},` : 'Madame, Monsieur,',
        body: `J'espère que ce message vous trouve en bonne santé.\n\n${mainMessage}\n\nJe reste à votre disposition pour tout complément d'information.`,
        closing: 'Cordialement,',
      },
      concis: {
        greeting: recipientName ? `Bonjour ${recipientName},` : 'Bonjour,',
        body: mainMessage,
        closing: 'Cordialement,',
      },
      chaleureux: {
        greeting: recipientName ? `Cher/Chère ${recipientName},` : 'Bonjour,',
        body: `J'espère que vous allez bien.\n\n${mainMessage}\n\nAu plaisir de vous lire bientôt.`,
        closing: 'Bien à vous,',
      },
      formel: {
        greeting: recipientName ? `${recipientTitle ? recipientTitle + ' ' : ''}${recipientName},` : 'Madame, Monsieur,',
        body: `J'ai l'honneur de vous écrire concernant :\n\n${mainMessage}\n\nVeuillez agréer mes salutations distinguées.`,
        closing: 'Respectueusement,',
      },
    },
    mg: {
      professionnel: {
        greeting: recipientName ? `Madame, Monsieur,` : 'Madame, Monsieur,',
        body: `${mainMessage}\n\nNandàra anao ny fahatsiarovanao.\n\nMiala tsiny,`,
        closing: '[Anaranao]',
      },
      concis: {
        greeting: recipientName ? `Salama,` : 'Salama,',
        body: `${mainMessage}\n\nMiala tsiny,`,
        closing: '[Anaranao]',
      },
      chaleureux: {
        greeting: recipientName ? `Salama,` : 'Salama,',
        body: `${mainMessage}\n\nMisaotra ny fahaliananareo.\n\nMiala tsiny,`,
        closing: '[Anaranao]',
      },
      formel: {
        greeting: recipientName ? `Madame, Monsieur,` : 'Madame, Monsieur,',
        body: `Mametraka antso ianao ara-tekinika momba ny : ${mainMessage}\n\nNandàra fa nihaino ity resaka ity.\n\nMiala tsiny,`,
        closing: '[Anaranao]',
      },
    },
    en: {
      professionnel: {
        greeting: recipientName ? `Dear ${recipientName},` : 'Dear Sir/Madam,',
        body: `I hope this email finds you well.\n\n${mainMessage}\n\nPlease don't hesitate to contact me if you need any additional information.`,
        closing: 'Best regards,',
      },
    },
  };

  const template = templates[language]?.[tone] || templates.fr.professionnel;
  return `${template.greeting}\n\n${template.body}\n\n${template.closing}\n\n[Votre nom]`;
};

export { generateFallbackEmail };