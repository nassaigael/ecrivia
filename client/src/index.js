// Exemple dans src/index.js ou src/App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import EmailComposerApp from './EmailComposerApp';

const googleClientId = '1059593758645-hvi0hgsoa25diak8tm111qiq5lr67ont.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmailComposerApp googleClientId={googleClientId} />
  </React.StrictMode>
);