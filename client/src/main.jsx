// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmailComposerApp from './pages/EmailComposerApp.jsx' // Chemin ajusté comme indiqué

const googleClientId = import.meta.env.VITE_GOOGLE_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmailComposerApp googleClientId={googleClientId} />
  </StrictMode>,
)