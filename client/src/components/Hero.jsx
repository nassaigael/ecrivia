import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sparkles, Mail, Zap, ArrowRight, Edit3, Globe, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

const Hero = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Générez des emails professionnels en quelques secondes';
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
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

  const floatingIconVariants = {
    animate: (delay) => ({
      y: [0, -20, 0],
      rotate: [0, 10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }
    })
  };

  const stats = [
    { value: "11+", label: "Langues supportées", icon: Globe },
    { value: "5", label: "Tons disponibles", icon: Edit3 },
    { value: "1000+", label: "Emails générés", icon: Mail },
    { value: "98%", label: "Satisfaction", icon: Star }
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32"
      style={{
        background: "radial-gradient(circle at 10% 20%, #f5e6ea 0%, #f0e2e6 100%)",
        minHeight: "100vh"
      }}
    >
      {/* Icônes flottantes décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          custom={0}
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-[15%] left-[5%] hidden xl:block"
        >
          <div className="p-3 rounded-2xl opacity-20" style={{
            background: "#f0e2e6",
            boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff"
          }}>
            <Mail className="h-12 w-12" style={{ color: "#c23b78" }} />
          </div>
        </motion.div>

        <motion.div
          custom={1}
          variants={floatingIconVariants}
          animate="animate"
          className="absolute bottom-[20%] right-[5%] hidden xl:block"
        >
          <div className="p-3 rounded-2xl opacity-20" style={{
            background: "#f0e2e6",
            boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff"
          }}>
            <Edit3 className="h-12 w-12" style={{ color: "#d95c92" }} />
          </div>
        </motion.div>

        <motion.div
          custom={2}
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-[30%] right-[10%] hidden lg:block"
        >
          <div className="p-2 rounded-xl opacity-15" style={{
            background: "#f0e2e6",
            boxShadow: "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff"
          }}>
            <Sparkles className="h-8 w-8" style={{ color: "#c23b78" }} />
          </div>
        </motion.div>

        <motion.div
          custom={1.5}
          variants={floatingIconVariants}
          animate="animate"
          className="absolute bottom-[30%] left-[8%] hidden lg:block"
        >
          <div className="p-2 rounded-xl opacity-15" style={{
            background: "#f0e2e6",
            boxShadow: "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff"
          }}>
            <Globe className="h-8 w-8" style={{ color: "#e07aa3" }} />
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Logo animé avec effet de glow */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 rounded-full"
              style={{ background: "radial-gradient(circle, #d95c92 0%, transparent 70%)", opacity: 0.3 }}
            />
            <div
              className="rounded-3xl p-5 relative"
              style={{
                background: "#f0e2e6",
                boxShadow: "20px 20px 40px #d0b6be, -20px -20px 40px #ffffff",
              }}
            >
              <img
                src={Logo}
                alt="ECRIVIA"
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Titre principal avec effet de texte */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.2]"
          style={{
            background: "linear-gradient(135deg, #c23b78, #d95c92, #e07aa3, #d95c92)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          Écrivez moins,
          <br />
          <span className="relative inline-block">
            communiquez mieux
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
              style={{ background: "linear-gradient(90deg, #c23b78, #d95c92, #e07aa3)" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </span>
        </motion.h1>

        {/* Texte tapé à la machine amélioré */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 6px 6px 12px #d0b6be, inset -6px -6px 12px #ffffff",
            }}
          >
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#d95c92" }} />
            <p className="text-base sm:text-lg md:text-xl font-medium" style={{ color: "#a86a8a" }}>
              <span>{typedText}</span>
              <span className="animate-pulse ml-0.5" style={{ color: "#c23b78" }}>|</span>
            </p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed px-4"
          style={{ color: "#8a5a6a" }}
        >
          ECRIVIA utilise l'intelligence artificielle pour rédiger des emails professionnels
          parfaitement adaptés à votre contexte, votre ton et votre langue.
          <span className="block mt-2 font-semibold" style={{ color: "#c23b78" }}>
            Gagnez du temps et soyez plus efficace.
          </span>
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/app')}
            className="group px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-white flex items-center gap-2 cursor-pointer relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #c23b78, #d95c92)",
              boxShadow: "12px 12px 24px #c0a0b0, -12px -12px 24px #ffffff",
            }}
          >
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              Commencer gratuitement
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer text-sm sm:text-base"
            style={{
              background: "#f0e2e6",
              boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff",
              color: "#c23b78"
            }}
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            En savoir plus
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </motion.button>
        </motion.div>

        {/* Statistiques animées */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16 pt-8 border-t"
          style={{ borderColor: "#e0c0d0" }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isActive = idx === currentStatIndex;
            return (
              <motion.div
                key={stat.label}
                className="text-center cursor-pointer"
                whileHover={{ scale: 1.05, y: -3 }}
                animate={isActive ? { scale: 1.05, y: -3 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      background: "#f0e2e6",
                      boxShadow: isActive ? "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff" : "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff",
                    }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: isActive ? "#d95c92" : "#c23b78" }} />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#c23b78" }}>{stat.value}</p>
                <p className="text-xs sm:text-sm" style={{ color: "#a86a8a" }}>{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;