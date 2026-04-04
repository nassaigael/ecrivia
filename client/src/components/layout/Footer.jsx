import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Linkedin,
  Github,
  Mail,
  Sparkles,
  Globe,
  Zap
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
      color: "#0077b5"
    },
    {
      icon: Github,
      href: "https://github.com/nassaigael",
      label: "GitHub",
      color: "#333333"
    },
    {
      icon: Mail,
      href: "mailto:gael@ecrivia.com",
      label: "Email",
      color: "#c23b78"
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
        background: "#f0e2e6",
        borderTop: "1px solid rgba(194,59,120,0.1)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="rounded-xl p-1.5"
                style={{
                  background: "#f0e2e6",
                  boxShadow: "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff",
                }}
              >
                <Sparkles className="h-5 w-5" style={{ color: "#c23b78" }} />
              </div>
              <span
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #c23b78, #d95c92)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ECRIVIA
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: "#a86a8a" }}>
              Générez des emails professionnels en quelques secondes grâce à l'intelligence artificielle.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "#f0e2e6",
                boxShadow: "inset 4px 4px 8px #d0b6be, inset -4px -4px 8px #ffffff",
              }}
            >
              <Zap className="h-3 w-3" style={{ color: "#d95c92" }} />
              <span className="text-xs" style={{ color: "#c23b78" }}>IA Powered by Puter.ai</span>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#c23b78" }}>Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.isRouter ? (
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-sm transition-colors hover:opacity-70"
                      style={{ color: "#a86a8a" }}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:opacity-70"
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
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#c23b78" }}>Suivez-nous</h3>
            <ul className="space-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                    style={{ color: "#a86a8a" }}
                  >
                    <social.icon className="h-4 w-4" style={{ color: social.color }} />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#c23b78" }}>Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@ecrivia.com"
                  className="text-sm transition-colors hover:opacity-70 flex items-center gap-2"
                  style={{ color: "#a86a8a" }}
                >
                  <Mail className="h-4 w-4" style={{ color: "#d95c92" }} />
                  contact@ecrivia.com
                </a>
              </li>
              <li>
                <span className="text-sm flex items-center gap-2" style={{ color: "#a86a8a" }}>
                  <Globe className="h-4 w-4" style={{ color: "#d95c92" }} />
                  ecrivia.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Développé par section */}
        <div
          className="pt-8 mt-4 text-center border-t"
          style={{ borderColor: "#e0c0d0" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
            <span style={{ color: "#a86a8a" }}>Développé avec</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-4 w-4" style={{ color: "#d95c92", fill: "#d95c92" }} />
            </motion.div>
            <span style={{ color: "#a86a8a" }}>par</span>
            <motion.a
              href="https://www.linkedin.com/in/nassaigael/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="font-semibold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #c23b78, #d95c92)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gaël RAMAHANDRISOA
            </motion.a>
            <span style={{ color: "#a86a8a" }}>|</span>
            <a
              href="https://github.com/nassaigael"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70 flex items-center gap-1"
              style={{ color: "#a86a8a" }}
            >
              <Github className="h-3 w-3" />
              <span>Portfolio</span>
            </a>
          </div>
          <p className="text-xs mt-4" style={{ color: "#c9a0b5" }}>
            © {currentYear} ECRIVIA - Tous droits réservés
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;