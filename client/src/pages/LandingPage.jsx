import LandingHeader from '../components/LandingHeader';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';

const LandingPage = () => {
  return (
    <div style={{ background: "#f5e6ea", minHeight: "100vh" }}>
      <LandingHeader />
      <Hero />
      {/* Autres sections avec des id pour la navigation */}
      <Features />
      <HowItWorks />
    </div>
  );
};

export default LandingPage;