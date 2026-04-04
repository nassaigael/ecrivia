import LandingHeader from '../components/layout/LandingHeader';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
import CTASection from '../components/sections/CTASection';

const LandingPage = () => {
  return (
    <div style={{ background: "#f5e6ea", minHeight: "100vh" }}>
      <LandingHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <CTASection />
    </div>
  );
};

export default LandingPage;