import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Zap, ArrowRight, Edit3, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Générez des emails professionnels en quelques secondes';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 20 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, y: -3 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28"
      style={{
        background: "linear-gradient(135deg, #f5e6ea 0%, #f0e2e6 100%)",
        minHeight: "100vh"
      }}
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Logo simplifié (sans image externe) */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div
            className="rounded-3xl p-4"
            style={{
              background: "#f0e2e6",
              boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
            }}
          >
            <Mail className="h-16 w-16 sm:h-20 sm:w-20" style={{ color: "#c23b78" }} />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: "#f0e2e6",
            boxShadow: "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff",
          }}
        >
          <Sparkles className="h-4 w-4" style={{ color: "#d95c92" }} />
          <span className="text-xs font-semibold" style={{ color: "#c23b78" }}>POWERED BY PUTER.AI</span>
          <Sparkles className="h-4 w-4" style={{ color: "#d95c92" }} />
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{
            background: "linear-gradient(135deg, #c23b78, #d95c92, #e07aa3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Écrivez moins,
          <br />
          communiquez mieux
        </motion.h1>

        {/* Texte tapé à la machine */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl mb-4 font-medium"
          style={{ color: "#a86a8a" }}
        >
          <span className="border-r-2 border-rose-400 pr-1">{typedText}</span>
          <span className="animate-pulse">|</span>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: "#8a5a6a" }}
        >
          ECRIVIA utilise l'intelligence artificielle pour rédiger des emails professionnels
          parfaitement adaptés à votre contexte, votre ton et votre langue. 
          Gagnez du temps et soyez plus efficace.
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/app')}
            className="px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #c23b78, #d95c92)",
              boxShadow: "10px 10px 20px #c0a0b0, -10px -10px 20px #ffffff",
            }}
          >
            <Zap className="h-5 w-5" />
            Commencer gratuitement
            <ArrowRight className="h-4 w-4" />
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer"
            style={{
              background: "#f0e2e6",
              boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
              color: "#c23b78"
            }}
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            En savoir plus
          </motion.button>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8 border-t"
          style={{ borderColor: "#e0c0d0" }}
        >
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: "#c23b78" }}>11+</p>
            <p className="text-xs sm:text-sm" style={{ color: "#a86a8a" }}>Langues supportées</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: "#c23b78" }}>5</p>
            <p className="text-xs sm:text-sm" style={{ color: "#a86a8a" }}>Tons disponibles</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: "#c23b78" }}>1000+</p>
            <p className="text-xs sm:text-sm" style={{ color: "#a86a8a" }}>Emails générés</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: "#c23b78" }}>98%</p>
            <p className="text-xs sm:text-sm" style={{ color: "#a86a8a" }}>Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;