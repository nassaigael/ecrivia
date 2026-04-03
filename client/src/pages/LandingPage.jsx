import Hero from '../components/Hero';

const LandingPage = () => {
  console.log('LandingPage chargée'); // Debug
  return (
    <div style={{ minHeight: '100vh' }}>
      <Hero />
      {/* Autres sections */}
    </div>
  );
};

export default LandingPage;