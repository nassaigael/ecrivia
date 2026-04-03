import React, { useState, useEffect } from 'react';
import {  AnimatePresence } from 'framer-motion';
import { usePuterAuth } from '../hooks/usePuterAuth';
import logo from '../assets/images/logo.png';

const LoginForm = ({ setUserData, setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signInWithPuter, checkPuterSession } = usePuterAuth();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await checkPuterSession();
        if (user) {
          handlePuterUser(user);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.log('Pas de session Puter existante');
      }
    };
    
    const checkPuterLoaded = () => {
      if (window.puter) {
        initAuth();
      } else {
        setTimeout(checkPuterLoaded, 100);
      }
    };
    
    checkPuterLoaded();
  }, []);

  const handlePuterUser = (puterUser) => {
    const userInfo = {
      id: puterUser.username || `user_${Date.now()}`,
      name: puterUser.name || puterUser.username || 'Utilisateur Puter',
      email: puterUser.email || `${puterUser.username || 'user'}@puter.com`,
      picture: puterUser.avatar || '',
      username: puterUser.username || '',
    };
    
    console.log('User info Puter.js:', userInfo);
    setUserData(userInfo);
    setIsLoggedIn(true);
    localStorage.setItem('puterUser', JSON.stringify(userInfo));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const user = await signInWithPuter();
      if (user) {
        handlePuterUser(user);
      } else {
        throw new Error('Authentification échouée');
      }
    } catch (err) {
      console.error('Erreur connexion Puter:', err);
      setError('Erreur lors de la connexion avec Puter. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    idle: { 
      scale: 1,
      boxShadow: "9px 9px 16px #c9a0b5, -9px -9px 16px #ffccdd"
    },
    hover: { 
      scale: 1.02,
      boxShadow: "13px 13px 20px #c9a0b5, -13px -13px 20px #ffccdd",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "5px 5px 10px #c9a0b5, -5px -5px 10px #ffccdd",
      transition: { duration: 0.1 }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, x: -20, height: 0 },
    visible: { 
      opacity: 1, 
      x: 0, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #ffb6c1 0%, #ff69b4 50%, #f34b9f 100%)"
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-md w-full"
      >
        {/* Carte Neumorphism */}
        <motion.div 
          variants={itemVariants}
          className="relative rounded-[40px] p-8"
          style={{
            background: "#ffb6c1",
            boxShadow: "20px 20px 40px #c9a0b5, -20px -20px 40px #ffccdd",
          }}
        >
          {/* Effet de brillance premium */}
          <motion.div 
            className="absolute -top-px -left-px right-0 bottom-0 rounded-[40px] pointer-events-none"
            style={{
              background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* Logo avec animation */}
          <motion.div 
            variants={logoVariants}
            className="text-center mb-8 flex flex-col items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <img 
                src={logo} 
                width={70} 
                height={70} 
                className="rounded-2xl"
                alt="Logo ECRIVIA" 
              />
              <motion.div 
                className="absolute -inset-1 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #ff69b4, #ffb6c1)",
                  opacity: 0.5,
                  filter: "blur(8px)",
                  zIndex: -1
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, #f34b9f, #ff69b4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                ECRIVIA
              </h1>
              <p className="text-gray-700 font-medium">Générateur d'emails intelligent</p>
            </motion.div>
          </motion.div>
          
          {/* Message d'erreur animé */}
          <AnimatePresence>
            {error && (
              <motion.div
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-6 p-3 rounded-xl"
                style={{
                  background: "#ffb6c1",
                  boxShadow: "inset 5px 5px 10px #c9a0b5, inset -5px -5px 10px #ffccdd",
                  border: "1px solid rgba(243,75,159,0.3)"
                }}
              >
                <p className="text-red-700 text-sm text-center font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Bouton de connexion */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleLogin}
              disabled={loading}
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              animate={loading ? "idle" : undefined}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ff69b4, #f34b9f)",
                boxShadow: "9px 9px 16px #c9a0b5, -9px -9px 16px #ffccdd",
              }}
            >
              {/* Effet de vague au hover */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                whileHover={{ opacity: 0.15 }}
                transition={{ duration: 0.2 }}
              />
              
              <div className="flex items-center justify-center gap-3 relative z-10">
                {loading ? (
                  <>
                    <motion.div 
                      className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <motion.svg 
                      className="h-5 w-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </motion.svg>
                    Se connecter avec Puter
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>
          
          {/* Informations supplémentaires */}
          <motion.div 
            variants={itemVariants}
            className="text-center pt-6 mt-4 border-t"
            style={{
              borderColor: "rgba(243,75,159,0.2)"
            }}
          >
            <p className="text-sm text-gray-700 font-medium">
              Utilisez votre compte Puter pour accéder à ECRIVIA
            </p>
            <motion.p 
              className="text-xs text-gray-600 mt-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Si vous n'avez pas de compte, il sera créé automatiquement ✨
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;