// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Edit3, 
  Cpu, 
  Shield, 
  Zap, 
  Languages,
  Mail,
  Star,
  Bot,
  Sparkles
} from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: Languages,
      title: "11 Langues supportées",
      description: "Français, Anglais, Espagnol, Allemand, Italien, Portugais, Néerlandais, Suédois, Danois, Norvégien et Malgache.",
      color: "#c23b78"
    },
    {
      icon: Edit3,
      title: "5 Tons différents",
      description: "Professionnel, Concis, Chaleureux, Formel ou Amical. Adaptez votre message à chaque situation.",
      color: "#d95c92"
    },
    {
      icon: Cpu,
      title: "IA Puissante",
      description: "Génération d'emails intelligents et contextuels grâce à l'IA de Puter.ai.",
      color: "#e07aa3"
    },
    {
      icon: Shield,
      title: "Sécurisé & Confidentiel",
      description: "Vos données sont protégées et vos emails restent confidentiels.",
      color: "#c23b78"
    },
    {
      icon: Zap,
      title: "Génération rapide",
      description: "Obtenez votre email parfaitement rédigé en moins de 10 secondes.",
      color: "#d95c92"
    },
    {
      icon: Bot,
      title: "Réponse contextuelle",
      description: "Collez un email existant, l'IA y répond intelligemment.",
      color: "#e07aa3"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 150 }
    }
  };

  return (
    <section
      id="features"
      ref={ref}
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32"
      style={{
        background: "#f5e6ea",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92, #e07aa3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Fonctionnalités premium
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{
                background: "linear-gradient(90deg, #c23b78, #d95c92, #e07aa3)",
                boxShadow: "2px 2px 4px #d0b6be, -2px -2px 4px #ffffff"
              }}
            />
          </div>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mt-4" style={{ color: "#8a5a6a" }}>
            Découvrez tout ce qu'ECRIVIA peut faire pour vous
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative rounded-3xl p-6 transition-all duration-300 cursor-pointer"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "20px 20px 40px #d0b6be, -20px -20px 40px #ffffff",
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 30% 20%, rgba(217,92,146,0.12), transparent)",
                  }}
                />

                <motion.div
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff",
                  }}
                >
                  <Icon className="h-8 w-8" style={{ color: feature.color }} />
                </motion.div>

                <h3 className="text-xl font-bold mb-3" style={{ color: "#c23b78" }}>
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "#a86a8a" }}>
                  {feature.description}
                </p>

                <div
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "inset 5px 5px 10px #d0b6be, inset -5px -5px 10px #ffffff",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Mail className="h-4 w-4" style={{ color: feature.color }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <div
            className="inline-flex items-center gap-5 px-8 py-4 rounded-full"
            style={{
              background: "#f0e2e6",
              boxShadow: "12px 12px 24px #d0b6be, -12px -12px 24px #ffffff",
            }}
          >
            <div
              className="p-2 rounded-xl"
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 5px 5px 10px #d0b6be, inset -5px -5px 10px #ffffff",
              }}
            >
              <Mail className="h-5 w-5" style={{ color: "#d95c92" }} />
            </div>
            <span className="text-sm font-medium" style={{ color: "#c23b78" }}>
              Plus de 1000 emails déjà générés par nos utilisateurs
            </span>
            <div
              className="p-2 rounded-xl"
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 5px 5px 10px #d0b6be, inset -5px -5px 10px #ffffff",
              }}
            >
              <Star className="h-5 w-5" style={{ color: "#d95c92" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;