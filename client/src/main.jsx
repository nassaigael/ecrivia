// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmailComposerApp from './pages/EmailComposerApp.jsx' // Ajuste le chemin si besoin (ex. : './components/EmailComposerApp.jsx')

const googleClientId = '1059593758645-hvi0hgsoa25diak8tm111qiq5lr67ont.apps.googleusercontent.com'; // Ton Client ID ici !

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmailComposerApp googleClientId={googleClientId} />
  </StrictMode>,
)