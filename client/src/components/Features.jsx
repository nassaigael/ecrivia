// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Edit3, 
  Cpu, 
  Shield, 
  Zap, 
  Sparkles,
  Languages,
  Mail,
  Star,
  Bot
} from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: Languages,
      title: "11 Langues supportées",
      description: "Français, Anglais, Espagnol, Allemand, Italien, Portugais, Néerlandais, Suédois, Danois, Norvégien et Malgache.",
      color: "#c23b78",
      gradient: "from-rose-400 to-pink-500"
    },
    {
      icon: Edit3,
      title: "5 Tons différents",
      description: "Professionnel, Concis, Chaleureux, Formel ou Amical. Adaptez votre message à chaque situation.",
      color: "#d95c92",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      icon: Cpu,
      title: "IA Puissante",
      description: "Génération d'emails intelligents et contextuels grâce à l'IA de Puter.ai.",
      color: "#e07aa3",
      gradient: "from-rose-300 to-pink-400"
    },
    {
      icon: Shield,
      title: "Sécurisé & Confidentiel",
      description: "Vos données sont protégées et vos emails restent confidentiels.",
      color: "#c23b78",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: Zap,
      title: "Génération rapide",
      description: "Obtenez votre email parfaitement rédigé en moins de 10 secondes.",
      color: "#d95c92",
      gradient: "from-rose-400 to-pink-500"
    },
    {
      icon: Bot,
      title: "Réponse contextuelle",
      description: "Collez un email existant, l'IA y répond intelligemment.",
      color: "#e07aa3",
      gradient: "from-pink-400 to-rose-500"
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

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 200 }
    }
  };

  return (
    <section
      id="features"
      ref={ref}
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32"
      style={{
        background: "linear-gradient(180deg, #f0e2e6 0%, #f5e6ea 100%)",
      }}
    >
      {/* Décoration de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #c23b78, transparent)" }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #d95c92, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badge */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: "#d95c92" }} />
            <span className="text-xs font-semibold" style={{ color: "#c23b78" }}>POURQUOI NOUS CHOISIR</span>
            <Sparkles className="h-4 w-4" style={{ color: "#d95c92" }} />
          </div>
        </motion.div>

        {/* Titre */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
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
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "#8a5a6a" }}>
            Découvrez tout ce qu'ECRIVIA peut faire pour vous
          </p>
        </motion.div>

        {/* Grille des fonctionnalités */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "15px 15px 30px #d0b6be, -15px -15px 30px #ffffff",
                }}
              >
                {/* Effet de brillance au hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 30% 20%, rgba(217,92,146,0.15), transparent)",
                  }}
                />

                {/* Icône avec animation */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
                  }}
                >
                  <Icon className="h-7 w-7" style={{ color: feature.color }} />
                </motion.div>

                {/* Titre */}
                <h3 className="text-xl font-bold mb-2" style={{ color: "#c23b78" }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "#a86a8a" }}>
                  {feature.description}
                </p>

                {/* Ligne décorative au hover */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistique supplémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 6px 6px 12px #d0b6be, inset -6px -6px 12px #ffffff",
            }}
          >
            <Mail className="h-5 w-5" style={{ color: "#d95c92" }} />
            <span className="text-sm font-medium" style={{ color: "#c23b78" }}>
              Plus de 1000 emails déjà générés par nos utilisateurs
            </span>
            <Star className="h-5 w-5" style={{ color: "#d95c92" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;