import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight, LogIn, Info, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

const LandingHeader = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 20 }
    }
  };

  const logoVariants = {
    hover: { scale: 1.05, rotate: 3 },
    tap: { scale: 0.98 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        background: isScrolled 
          ? "rgba(240, 226, 230, 0.95)" 
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled 
          ? "0 8px 32px rgba(0,0,0,0.08), 15px 15px 30px #d0b6be, -15px -15px 30px #ffffff" 
          : "none",
        borderBottom: isScrolled ? "1px solid rgba(194,59,120,0.1)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div
              className="rounded-2xl p-2 transition-all duration-300 group-hover:shadow-xl"
              style={{
                background: "#f0e2e6",
                boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
              }}
            >
              <img 
                src={Logo} 
                alt="ECRIVIA" 
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-lg" 
              />
            </div>
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight hidden xs:inline"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92, #e07aa3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              ECRIVIA
            </span>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1 group"
              style={{ color: "#c23b78" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span>Fonctionnalités</span>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#how-it-works"
              className="text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1 group"
              style={{ color: "#c23b78" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span>Comment ça marche</span>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/app')}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92)",
                boxShadow: "8px 8px 16px #c0a0b0, -8px -8px 16px #ffffff",
                color: "white"
              }}
            >
              <span className="relative z-10">Se connecter</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </nav>

          {/* Bouton menu mobile - Neumorphism stylé */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl transition-all duration-300"
            style={{
              background: "#f0e2e6",
              boxShadow: isMobileMenuOpen 
                ? "inset 6px 6px 12px #d0b6be, inset -6px -6px 12px #ffffff"
                : "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
            }}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" style={{ color: "#c23b78" }} />
            ) : (
              <Menu className="h-5 w-5" style={{ color: "#c23b78" }} />
            )}
          </motion.button>
        </div>

        {/* Menu mobile - Neumorphism premium */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden mt-5 rounded-3xl overflow-hidden"
              style={{
                background: "#f0e2e6",
                boxShadow: "25px 25px 50px #d0b6be, -25px -25px 50px #ffffff",
              }}
            >
              {/* En-tête du menu mobile */}
              <div
                className="px-5 py-4 text-center"
                style={{
                  background: "#f0e2e6",
                  borderBottom: "1px solid rgba(194,59,120,0.1)",
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.02)"
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="rounded-xl p-1.5"
                    style={{
                      background: "#f0e2e6",
                      boxShadow: "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff",
                    }}
                  >
                    <img src={Logo} alt="logo" className="h-6 w-6 rounded-lg" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#c23b78" }}>
                    ECRIVIA
                  </span>
                </div>
              </div>

              {/* Navigation mobile */}
              <nav className="p-4 flex flex-col gap-2">
                <motion.a
                  variants={mobileItemVariants}
                  whileTap={{ scale: 0.97 }}
                  href="#features"
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "5px 5px 10px #d0b6be, -5px -5px 10px #ffffff",
                    color: "#c23b78"
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{
                        background: "#f0e2e6",
                        boxShadow: "inset 3px 3px 6px #d0b6be, inset -3px -3px 6px #ffffff",
                      }}
                    >
                      <Info className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">Fonctionnalités</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.a>
                
                <motion.a
                  variants={mobileItemVariants}
                  whileTap={{ scale: 0.97 }}
                  href="#how-it-works"
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "5px 5px 10px #d0b6be, -5px -5px 10px #ffffff",
                    color: "#c23b78"
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{
                        background: "#f0e2e6",
                        boxShadow: "inset 3px 3px 6px #d0b6be, inset -3px -3px 6px #ffffff",
                      }}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">Comment ça marche</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.a>

                {/* Séparateur décoratif */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #d0b6be, transparent)" }} />
                  </div>
                </div>
                
                {/* Bouton connexion mobile */}
                <motion.button
                  variants={mobileItemVariants}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/app');
                  }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm relative overflow-hidden mt-2"
                  style={{
                    background: "linear-gradient(135deg, #c23b78, #d95c92)",
                    boxShadow: "8px 8px 16px #c0a0b0, -8px -8px 16px #ffffff",
                    color: "white"
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Se connecter</span>
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default LandingHeader;