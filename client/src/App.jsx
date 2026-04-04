import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailComposerApp from './pages/Ecrivia';
import LandingPage from './pages/LandingPage';
import './index.css';

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