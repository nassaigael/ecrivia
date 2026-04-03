/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { usePuterAuth } from '../hooks/usePuterAuth';
import { User, Lock } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6, 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    idle: { 
      scale: 1,
      boxShadow: "12px 12px 24px #d4b0bc, -12px -12px 24px #ffffff"
    },
    hover: { 
      scale: 1.03,
      boxShadow: "16px 16px 32px #d4b0bc, -16px -16px 32px #ffffff",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.96,
      boxShadow: "6px 6px 12px #d4b0bc, -6px -6px 12px #ffffff",
      transition: { duration: 0.1 }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -15, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: "auto",
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "#f5e6ea"
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Carte Neumorphism ultra prononcé */}
        <motion.div 
          variants={cardVariants}
          className="rounded-[60px] p-10"
          style={{
            background: "#f0e2e6",
            boxShadow: "35px 35px 70px #d0b6be, -35px -35px 70px #ffffff",
          }}
        >
          {/* Logo section avec relief maximal */}
          <motion.div 
            variants={logoVariants}
            className="text-center mb-10 flex flex-col items-center gap-5"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="relative"
            >
              <div
                className="rounded-3xl p-4"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
                }}
              >
                <img 
                  src={logo} 
                  width={70} 
                  height={70} 
                  className="rounded-2xl"
                  alt="Logo ECRIVIA" 
                />
              </div>
              {/* Effet de brillance supplémentaire */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
                }}
              />
            </motion.div>
            
            <div>
              <h1 
                className="text-4xl font-bold mb-3 tracking-tight"
                style={{
                  color: "#c23b78",
                  textShadow: "3px 3px 6px #ffffff, -2px -2px 4px #d0b6be"
                }}
              >
                ECRIVIA
              </h1>
              <p 
                className="font-medium text-lg"
                style={{
                  color: "#d95c92",
                  textShadow: "2px 2px 3px #ffffff, -1px -1px 2px #d0b6be"
                }}
              >
                Générateur d'emails intelligent
              </p>
            </div>
          </motion.div>
          
          {/* Message d'erreur avec neumorphism inset */}
          <AnimatePresence>
            {error && (
              <motion.div
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-6 p-4 rounded-2xl overflow-hidden"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "inset 8px 8px 16px #d0b6be, inset -8px -8px 16px #ffffff",
                }}
              >
                <p className="text-rose-700 text-sm text-center font-semibold">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Input style neumorphism enfoncé avec icône User */}
          <motion.div 
            variants={logoVariants} 
            className="mb-8"
          >
            <div
              className="rounded-2xl p-1"
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 8px 8px 16px #d0b6be, inset -8px -8px 16px #ffffff",
              }}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <User className="h-5 w-5" style={{ color: "#c23b78" }} />
                <input
                  type="text"
                  placeholder="Nom d'utilisateur (optionnel)"
                  className="flex-1 rounded-xl outline-none transition-all duration-300 bg-transparent"
                  style={{
                    color: "#8b2a5a",
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.parentElement.style.boxShadow = "inset 12px 12px 24px #d0b6be, inset -12px -12px 24px #ffffff";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.parentElement.style.boxShadow = "inset 8px 8px 16px #d0b6be, inset -8px -8px 16px #ffffff";
                  }}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Bouton de connexion avec neumorphism extrême et icône LogIn */}
          <motion.div variants={logoVariants}>
            <motion.button
              onClick={handleLogin}
              disabled={loading}
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              className="w-full py-4 px-4 rounded-2xl font-bold text-lg relative overflow-hidden transition-all duration-200"
              style={{
                background: "#f0e2e6",
                boxShadow: "12px 12px 24px #d4b0bc, -12px -12px 24px #ffffff",
                color: "#c23b78"
              }}
            >
              {/* Effet de brillance au hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                whileHover={{ x: ["0%", "100%"] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <div className="flex items-center justify-center gap-3 relative z-10">
                {loading ? (
                  <>
                    <motion.div 
                      className="rounded-full h-5 w-5 border-3"
                      style={{ borderColor: "#c23b78", borderTopColor: "transparent" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Se connecter avec Puter</span>
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>
          
          <motion.div 
            variants={logoVariants}
            className="text-center pt-8 mt-6"
          >
            <div
              className="p-3 rounded-xl flex items-center justify-center gap-2"
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff",
              }}
            >
              <Lock className="h-4 w-4" style={{ color: "#c23b78" }} />
              <p 
                className="text-sm font-semibold"
                style={{ color: "#c23b78" }}
              >
                Utilisez votre compte Puter
              </p>
            </div>
            <motion.div 
              className="flex items-center justify-center gap-2 mt-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <p 
                className="text-xs font-medium"
                style={{ color: "#d95c92" }}
              >
                Sans compte Puter ? Création automatique
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;