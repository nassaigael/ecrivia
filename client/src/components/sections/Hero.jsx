import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Zap, ArrowRight, Edit3, Globe, Star, Clock, Cpu, Shield, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Hero = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const phrases = [
    { text: "Générez des emails professionnels en quelques secondes", icon: Zap },
    { text: "Plus de 11 langues supportées", icon: Globe },
    { text: "5 tons différents pour chaque situation", icon: Edit3 },
    { text: "IA puissante pour des emails percutants", icon: Cpu },
    { text: "Sécurisé et confidentiel", icon: Shield }
  ];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex].text;

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length === currentPhrase.length) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, isDeleting, phraseIndex, phrases]);

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

  const CurrentIcon = phrases[phraseIndex].icon;

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
            <Mail className="h-12 w-12" style={{ color: "#d95c92" }} />
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
            <Mail className="h-8 w-8" style={{ color: "#c23b78" }} />
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
            <Mail className="h-8 w-8" style={{ color: "#e07aa3" }} />
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6 md:mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 rounded-full"
              style={{ background: "radial-gradient(circle, #d95c92 0%, transparent 70%)", opacity: 0.3 }}
            />
            <div
              className="rounded-3xl p-4 md:p-5 relative"
              style={{
                background: "#f0e2e6",
                boxShadow: "20px 20px 40px #d0b6be, -20px -20px 40px #ffffff",
              }}
            >
              <img
                src={Logo}
                alt="ECRIVIA"
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Titre avec tailles responsives corrigées */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-[1.2] px-2"
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
              className="absolute -bottom-2 left-0 right-0 h-0.5 md:h-1 rounded-full"
              style={{ background: "linear-gradient(90deg, #c23b78, #d95c92, #e07aa3)" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 6px 6px 12px #d0b6be, inset -6px -6px 12px #ffffff",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phraseIndex}
                initial={{ rotate: -180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <CurrentIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" style={{ color: "#d95c92" }} />
              </motion.div>
            </AnimatePresence>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium" style={{ color: "#a86a8a" }}>
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-0.5 inline-block"
                style={{ color: "#c23b78" }}
              >
                |
              </motion.span>
            </p>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
          style={{ color: "#8a5a6a" }}
        >
          ECRIVIA utilise l'intelligence artificielle pour rédiger des emails professionnels
          parfaitement adaptés à votre contexte, votre ton et votre langue.
          <span className="block mt-2 font-semibold" style={{ color: "#c23b78" }}>
            Gagnez du temps et soyez plus efficace.
          </span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16"
        >
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/app')}
            className="group px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl font-bold text-white flex items-center gap-2 cursor-pointer relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #c23b78, #d95c92)",
              boxShadow: "12px 12px 24px #c0a0b0, -12px -12px 24px #ffffff",
            }}
          >
            <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm md:text-base">
              <Rocket className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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
            className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer text-xs sm:text-sm md:text-base"
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

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-8 border-t"
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
                <div className="flex items-center justify-center mb-1 md:mb-2">
                  <div
                    className="p-1.5 md:p-2 rounded-xl"
                    style={{
                      background: "#f0e2e6",
                      boxShadow: isActive ? "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff" : "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff",
                    }}
                  >
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" style={{ color: isActive ? "#d95c92" : "#c23b78" }} />
                  </div>
                </div>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: "#c23b78" }}>{stat.value}</p>
                <p className="text-[10px] sm:text-xs md:text-sm" style={{ color: "#a86a8a" }}>{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;