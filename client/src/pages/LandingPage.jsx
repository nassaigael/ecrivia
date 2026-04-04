import LandingHeader from '../components/LandingHeader';
import Hero from '../components/Hero';
import Features from '../components/Features';

const LandingPage = () => {
  return (
    <div style={{ background: "#f5e6ea", minHeight: "100vh" }}>
      <LandingHeader />
      <Hero />
      {/* Autres sections avec des id pour la navigation */}
      <Features />
      <section id="how-it-works">
        {/* Section comment ça marche à venir */}
      </section>
    </div>
  );
};

export default LandingPage;