import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmailComposerApp from './pages/EmailComposerApp';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/app" element={<EmailComposerApp />} />
        
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;