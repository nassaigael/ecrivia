import LandingHeader from '../components/LandingHeader';
import Hero from '../components/Hero';

const LandingPage = () => {
  return (
    <div style={{ background: "#f5e6ea", minHeight: "100vh" }}>
      <LandingHeader />
      <Hero />
      {/* Autres sections avec des id pour la navigation */}
      <section id="features">
        {/* Section fonctionnalités à venir */}
      </section>
      <section id="how-it-works">
        {/* Section comment ça marche à venir */}
      </section>
    </div>
  );
};

export default LandingPage;