import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
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
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        background: isScrolled ? "#f0e2e6e6" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.05), 10px 10px 20px #d0b6be, -10px -10px 20px #ffffff" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div
              className="rounded-xl p-1.5"
              style={{
                background: "#f0e2e6",
                boxShadow: "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff",
              }}
            >
              <img src={Logo} alt="ECRIVIA" className="h-8 w-8 object-contain rounded-lg" />
            </div>
            <span
              className="text-xl font-bold"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ECRIVIA
            </span>
            <Sparkles className="h-4 w-4" style={{ color: "#d95c92" }} />
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "#c23b78" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Fonctionnalités
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "#c23b78" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Comment ça marche
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/app')}
              className="px-5 py-2 rounded-xl font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92)",
                boxShadow: "6px 6px 12px #c0a0b0, -6px -6px 12px #ffffff",
                color: "white"
              }}
            >
              Se connecter
            </motion.button>
          </nav>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl"
            style={{
              background: "#f0e2e6",
              boxShadow: "4px 4px 8px #d0b6be, -4px -4px 8px #ffffff",
            }}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" style={{ color: "#c23b78" }} />
            ) : (
              <Menu className="h-5 w-5" style={{ color: "#c23b78" }} />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 p-4 rounded-2xl"
            style={{
              background: "#f0e2e6",
              boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff",
            }}
          >
            <nav className="flex flex-col gap-3">
              <a
                href="#features"
                className="text-sm font-medium py-2 px-3 rounded-xl transition-colors hover:opacity-70"
                style={{ color: "#c23b78" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Fonctionnalités
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium py-2 px-3 rounded-xl transition-colors hover:opacity-70"
                style={{ color: "#c23b78" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Comment ça marche
              </a>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/app');
                }}
                className="py-2 rounded-xl font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, #c23b78, #d95c92)",
                  color: "white"
                }}
              >
                Se connecter
              </motion.button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default LandingHeader;