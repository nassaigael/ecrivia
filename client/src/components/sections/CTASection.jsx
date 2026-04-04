// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight, Rocket, CheckCircle, Mail, Star, MailCheck } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 150 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, y: -3 },
    tap: { scale: 0.98 }
  };

  const floatingIconVariants = {
    animate: (delay) => ({
      y: [0, -15, 0],
      rotate: [0, 10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }
    })
  };

  const benefits = [
    { icon: CheckCircle, text: "Gratuit", color: "#c23b78" },
    { icon: Star, text: "Qualité premium", color: "#e07aa3" }
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32"
      style={{
        background: "linear-gradient(135deg, #f5e6ea 0%, #f0e2e6 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          custom={0}
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-[10%] left-[5%] hidden xl:block"
        >
          <div className="p-3 rounded-2xl opacity-15"
            style={{
              background: "#f0e2e6",
              boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff"
            }}
          >
            <MailCheck className="h-10 w-10" style={{ color: "#c23b78" }} />
          </div>
        </motion.div>

        <motion.div
          custom={1}
          variants={floatingIconVariants}
          animate="animate"
          className="absolute bottom-[15%] right-[5%] hidden xl:block"
        >
          <div className="p-3 rounded-2xl opacity-15"
            style={{
              background: "#f0e2e6",
              boxShadow: "10px 10px 20px #d0b6be, -10px -10px 20px #ffffff"
            }}
          >
            <Rocket className="h-10 w-10" style={{ color: "#d95c92" }} />
          </div>
        </motion.div>

        <motion.div
          custom={1.5}
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-[40%] right-[8%] hidden lg:block"
        >
          <div className="p-2 rounded-xl opacity-10"
            style={{
              background: "#f0e2e6",
              boxShadow: "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff"
            }}
          >
            <Zap className="h-6 w-6" style={{ color: "#e07aa3" }} />
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="rounded-3xl p-8 md:p-12 lg:p-16 text-center"
          style={{
            background: "#f0e2e6",
            boxShadow: "30px 30px 60px #d0b6be, -30px -30px 60px #ffffff",
          }}
        >

          <motion.h2
            variants={titleVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{
              background: "linear-gradient(135deg, #c23b78, #d95c92, #e07aa3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Prêt à révolutionner
            <br />
            vos emails ?
          </motion.h2>

          <motion.p
            variants={titleVariants}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: "#8a5a6a" }}
          >
            Rejoignez des milliers d'utilisateurs qui gagnent du temps chaque jour
            grâce à l'IA d'ECRIVIA.
          </motion.p>

          <motion.div
            variants={titleVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "#f0e2e6",
                    boxShadow: "5px 5px 10px #d0b6be, -5px -5px 10px #ffffff",
                  }}
                >
                  <Icon className="h-4 w-4" style={{ color: benefit.color }} />
                  <span className="text-xs sm:text-sm font-medium" style={{ color: benefit.color }}>
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            variants={titleVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/app')}
              className="group px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 cursor-pointer relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92)",
                boxShadow: "15px 15px 30px #c0a0b0, -15px -15px 30px #ffffff",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-base sm:text-lg">
                <Rocket className="h-5 w-5" />
                Commencer gratuitement
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>

          <motion.p
            variants={titleVariants}
            className="text-xs sm:text-sm mt-6"
            style={{ color: "#a86a8a" }}
          >
            Aucune carte bancaire requise - Commencez en quelques secondes
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;