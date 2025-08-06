import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';


// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Initialiser le client Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // La clé est lue depuis .env
});

async function main() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Bonjour, expliquez-moi l’importance des modèles de langage rapides.', // Message non vide
        },
      ],
      model: 'llama3-8b-8192', // Modèle valide (vérifiez la disponibilité)
      temperature: 1,
      max_tokens: 1024, // Corrigé de max_completion_tokens
      top_p: 1,
      stream: true,
      stop: null,
    });

    // Afficher la réponse en streaming
    for await (const chunk of chatCompletion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
  } catch (error) {
    console.error('Erreur :', error.message);
  }
}

main();