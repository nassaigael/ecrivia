import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Edit3, Globe, Send, Sparkles } from 'lucide-react';

const Instructions = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 200 }
    }
  };

  const steps = [
    {
      number: 1,
      icon: Edit3,
      title: "Décrivez votre message principal",
      description: "et sélectionnez le ton souhaité"
    },
    {
      number: 2,
      icon: Globe,
      title: "Choisissez la langue de sortie",
      description: "et renseignez les informations du destinataire"
    },
    {
      number: 3,
      icon: Send,
      title: "Générez votre e-mail avec Puter",
      description: "et copiez-le dans votre client de messagerie"
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 rounded-3xl p-6"
      style={{
        background: "#f0e2e6",
        boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
      }}
    >
      {/* Titre avec icône */}
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6">
        <h3 
          className="text-xl font-bold text-center"
          style={{
            background: "linear-gradient(135deg, #c23b78, #d95c92)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Comment utiliser ECRIVIA
        </h3>
      </motion.div>

      {/* Étapes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-2xl p-4"
            style={{
              background: "#f0e2e6",
              boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
            }}
          >
            <div className="flex flex-col items-center text-center gap-3">
              {/* Numéro avec style neumorphism */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff",
                  color: "#c23b78"
                }}
              >
                {step.number}
              </motion.div>

              {/* Icône */}
              <div
                className="rounded-xl p-2"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff",
                }}
              >
                <step.icon className="h-5 w-5" style={{ color: "#d95c92" }} />
              </div>

              {/* Texte */}
              <div>
                <p className="font-semibold text-sm" style={{ color: "#c23b78" }}>
                  {step.title}
                </p>
                <p className="text-xs mt-1" style={{ color: "#e07aa3" }}>
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ligne décorative en bas */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 pt-3 text-center"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "#f0e2e6",
            boxShadow: "inset 3px 3px 6px #d0b6be, inset -3px -3px 6px #ffffff",
          }}
        >
          <p className="text-xs font-medium" style={{ color: "#c23b78" }}>
             Générez des emails professionnels en quelques secondes 
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Instructions;