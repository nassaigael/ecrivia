import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Mail, CheckCircle, Sparkles, FileText, Check } from 'lucide-react';

const GeneratedEmail = ({ generatedEmail, setGeneratedEmail, copySuccess, setCopySuccess }) => {
  const textareaRef = useRef(null);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 20 }
    }
  };

  const copyButtonVariants = {
    idle: {
      scale: 1,
      boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff"
    },
    hover: {
      scale: 1.05,
      boxShadow: "12px 12px 24px #d0b6be, -12px -12px 24px #ffffff",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      boxShadow: "4px 4px 8px #d0b6be, -4px -4px 8px #ffffff",
      transition: { duration: 0.1 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.92, rotateX: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      rotateX: 5,
      transition: { duration: 0.3 }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 18
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const mailIconVariants = {
    animate: {
      y: [0, -12, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const toastVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-[40px] p-6 md:p-8"
      style={{
        background: "#f0e2e6",
        boxShadow: "25px 25px 50px #d0b6be, -25px -25px 50px #ffffff",
      }}
    >
      {/* En-tête */}
      <motion.div
        variants={headerVariants}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, #c23b78, #d95c92)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          E-mail généré
        </motion.h2>

        {generatedEmail && (
          <motion.button
            onClick={handleCopyToClipboard}
            variants={copyButtonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200"
            style={{
              background: copySuccess ? "#d95c92" : "#f0e2e6",
              boxShadow: copySuccess
                ? "10px 10px 20px #b84a7a, -10px -10px 20px #ff6eaa"
                : "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
              color: copySuccess ? "#ffffff" : "#c23b78"
            }}
          >
            {copySuccess ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copier</span>
              </>
            )}
          </motion.button>
        )}
      </motion.div>

      {/* Contenu principal avec animation d'apparition */}
      <AnimatePresence mode="wait">
        {generatedEmail ? (
          <motion.div
            key="email-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-2xl p-1"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 12px 12px 24px #d0b6be, inset -12px -12px 24px #ffffff",
            }}
          >
            <textarea
              ref={textareaRef}
              value={generatedEmail}
              onChange={(e) => setGeneratedEmail(e.target.value)}
              className="w-full bg-transparent rounded-xl p-5 resize-none focus:outline-none transition-all duration-200"
              style={{
                color: "#5a2a46",
                fontSize: "14px",
                lineHeight: "1.7",
                minHeight: "400px"
              }}
              rows={22}
              placeholder="Votre e-mail généré apparaîtra ici..."
            />
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 12px 12px 24px #d0b6be, inset -12px -12px 24px #ffffff",
            }}
          >
            <motion.div
              variants={mailIconVariants}
              animate="animate"
              whileHover="hover"
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 cursor-pointer"
              style={{
                background: "#f0e2e6",
                boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
              }}
            >
              <Mail className="h-12 w-12" style={{ color: "#d95c92" }} />
            </motion.div>
            <motion.p
              className="font-bold text-xl mb-2"
              style={{ color: "#c23b78" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Aucun e-mail généré
            </motion.p>
            <motion.p
              className="text-sm mb-4"
              style={{ color: "#a86a8a" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Remplissez le formulaire et cliquez sur "Générer l'e-mail" pour commencer
            </motion.p>
            <motion.div
              className="flex justify-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff",
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: "#d95c92" }} />
                <span className="text-xs font-medium" style={{ color: "#c23b78" }}>L'IA rédige pour vous</span>
                <Sparkles className="h-4 w-4" style={{ color: "#d95c92" }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification toast animée en thème rose */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl"
            style={{
              background: "#f0e2e6",
              boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
              border: "1px solid rgba(194,59,120,0.3)"
            }}
          >
            <div
              className="rounded-full p-1.5"
              style={{
                background: "#d95c92",
                boxShadow: "inset 3px 3px 6px #b84a7a, inset -3px -3px 6px #ff6eaa"
              }}
            >
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold" style={{ color: "#c23b78" }}>
              Copié dans le presse-papier !
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GeneratedEmail;