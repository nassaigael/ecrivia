import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div className="mb-4 md:mb-0">
          <p>© {new Date().getFullYear()} ECRIVIA. Tous droits réservés.</p>
        </div>
        <div className="flex items-center gap-1">
          <span>Développé avec</span>
          <Heart className="h-4 w-4 text-red-500 fill-current" />
          <span>par</span>
          <a 
            href="https://www.linkedin.com/in/nassaigael/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium ml-1"
          >
            Gaël RAMAHANDRISOA
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
