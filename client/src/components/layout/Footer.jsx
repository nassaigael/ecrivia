// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Linkedin,
  Mail,
  Sparkles,
  Globe,
  Zap,
  Star,
  Briefcase
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/nassaigael/",
      label: "LinkedIn",
    },
    {
      icon: Briefcase,
      href: "https://nassaigael.github.io",
      label: "Portfolio",
    },
    {
      icon: Mail,
      href: "mailto:gael.ramahandrisoa@gmail.com",
      label: "Email",
    }
  ];

  const navLinks = [
    { name: "Fonctionnalités", href: "#features" },
    { name: "Comment ça marche", href: "#how-it-works" },
    { name: "Commencer", href: "/app", isRouter: true }
  ];

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      style={{
        background: "linear-gradient(135deg, #f0e2e6 0%, #e8d8de 100%)",
        borderTop: "1px solid rgba(194,59,120,0.15)"
      }}
    >
      {/* Décoration de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #c23b78, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grille principale - centrée sur mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 text-center sm:text-left">

          {/* Brand section */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="rounded-xl p-2"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
                }}
              >
                <Sparkles className="h-5 w-5" style={{ color: "#c23b78" }} />
              </div>
              <span
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #c23b78, #d95c92, #e07aa3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ECRIVIA
              </span>
            </div>
            <p className="text-sm mb-4 max-w-xs text-center sm:text-left" style={{ color: "#a86a8a" }}>
              Générez des emails professionnels en quelques secondes grâce à l'intelligence artificielle.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 5px 5px 10px #d0b6be, inset -5px -5px 10px #ffffff",
              }}
            >
              <Zap className="h-3.5 w-3.5" style={{ color: "#d95c92" }} />
              <span className="text-xs font-medium" style={{ color: "#c23b78" }}>IA Powered by Puter.ai</span>
              <Star className="h-3 w-3" style={{ color: "#e07aa3" }} />
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3
              className="font-bold mb-4 text-base relative inline-block pb-2"
              style={{ color: "#c23b78" }}
            >
              Navigation
              <div
                className="absolute bottom-0 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, #c23b78, #d95c92)" }}
              />
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.isRouter ? (
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-sm transition-all duration-300 hover:translate-x-1 hover:opacity-80"
                      style={{ color: "#a86a8a" }}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm transition-all duration-300 hover:translate-x-1 hover:opacity-80 inline-block"
                      style={{ color: "#a86a8a" }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3
              className="font-bold mb-4 text-base relative inline-block pb-2"
              style={{ color: "#c23b78" }}
            >
              Suivez-moi
              <div
                className="absolute bottom-0 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, #c23b78, #d95c92)" }}
              />
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-3 text-sm transition-all duration-300 hover:scale-105 group"
                    style={{ color: "#a86a8a" }}
                  >
                    <div
                      className="p-1.5 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        background: "#f0e2e6",
                        boxShadow: "4px 4px 8px #d0b6be, -4px -4px 8px #ffffff",
                      }}
                    >
                      <social.icon className="h-4 w-4" style={{ color: "#d95c92" }} />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {social.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3
              className="font-bold mb-4 text-base relative inline-block pb-2"
              style={{ color: "#c23b78" }}
            >
              Contact
              <div
                className="absolute bottom-0 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, #c23b78, #d95c92)" }}
              />
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@ecrivia.com"
                  className="flex items-center justify-center sm:justify-start gap-2 text-sm transition-all duration-300 hover:scale-105 group"
                  style={{ color: "#a86a8a" }}
                >
                  <div
                    className="p-1.5 rounded-lg transition-all duration-300"
                    style={{
                      background: "#f0e2e6",
                      boxShadow: "4px 4px 8px #d0b6be, -4px -4px 8px #ffffff",
                    }}
                  >
                    <Mail className="h-4 w-4" style={{ color: "#d95c92" }} />
                  </div>
                  <span>contact@ecrivia.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{
                      background: "#f0e2e6",
                      boxShadow: "inset 3px 3px 6px #d0b6be, inset -3px -3px 6px #ffffff",
                    }}
                  >
                    <Globe className="h-4 w-4" style={{ color: "#d95c92" }} />
                  </div>
                  <span style={{ color: "#a86a8a" }}>ecrivia.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Développé par section - premium */}
        <div
          className="pt-10 mt-6 text-center border-t"
          style={{ borderColor: "#e0c0d0" }}
        >
          <div
            className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-full mb-4"
            style={{
              background: "#f0e2e6",
              boxShadow: "inset 6px 6px 12px #d0b6be, inset -6px -6px 12px #ffffff",
            }}
          >
            <span className="text-sm" style={{ color: "#a86a8a" }}>Développé avec</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart className="h-4 w-4" style={{ color: "#d95c92", fill: "#d95c92" }} />
            </motion.div>
            <span className="text-sm" style={{ color: "#a86a8a" }}>par</span>
            <motion.a
              href="https://www.linkedin.com/in/nassaigael/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="font-bold text-sm transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gaël RAMAHANDRISOA
            </motion.a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs" style={{ color: "#c9a0b5" }}>
            <span>© {currentYear} ECRIVIA</span>
            <span>•</span>
            <span>Tous droits réservés</span>
            <span>•</span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;