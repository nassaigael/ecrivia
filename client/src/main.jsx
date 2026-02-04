// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmailComposerApp from './pages/EmailComposerApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmailComposerApp />
  </StrictMode>,
)