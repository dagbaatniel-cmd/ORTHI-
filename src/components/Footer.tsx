import React from 'react';
import { RESTAURANT_LOCATION } from '../utils/order';

interface FooterProps {
  onOpenLegal: (tab: 'confidentialite' | 'cookies' | 'utilisation' | 'vente') => void;
  onOpenCookieSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenCookieSettings }) => {
  return (
    <footer className="bg-[#103526] text-white pt-16 pb-12 border-t border-[#174B35]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
        
        {/* Brand */}
        <a href="#accueil" className="inline-flex flex-col items-center mb-4 group focus:outline-none">
          <span className="text-3xl font-black tracking-wider text-white group-hover:text-[#E88A32] transition-colors">
            ORTHI
          </span>
          <span className="text-xs font-bold tracking-[0.4em] text-[#E88A32] group-hover:text-white transition-colors mt-0.5">
            DÉLICES
          </span>
        </a>

        <p className="text-sm text-[#E0E9E1] max-w-md mx-auto mb-8">
          Restaurant & Chawarmas à {RESTAURANT_LOCATION}. Viandes braisées, burgers gourmands et cuisine authentique.
        </p>

        {/* Legal & Policy Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/80 mb-8" aria-label="Informations légales">
          <button
            type="button"
            onClick={() => onOpenLegal('confidentialite')}
            className="hover:text-[#FFD09C] underline underline-offset-4 focus:outline-none"
          >
            Confidentialité
          </button>

          <button
            type="button"
            onClick={() => onOpenLegal('cookies')}
            className="hover:text-[#FFD09C] underline underline-offset-4 focus:outline-none"
          >
            Cookies
          </button>

          <button
            type="button"
            onClick={() => onOpenLegal('utilisation')}
            className="hover:text-[#FFD09C] underline underline-offset-4 focus:outline-none"
          >
            Conditions d'utilisation
          </button>

          <button
            type="button"
            onClick={() => onOpenLegal('vente')}
            className="hover:text-[#FFD09C] underline underline-offset-4 focus:outline-none"
          >
            Conditions de vente
          </button>

          <button
            type="button"
            onClick={onOpenCookieSettings}
            className="hover:text-[#FFD09C] underline underline-offset-4 focus:outline-none"
          >
            Paramètres des cookies
          </button>
        </nav>

        {/* Photo Transparency Note */}
        <p className="text-[11px] text-white/50 max-w-lg mx-auto mb-6">
          📷 Photographies professionnelles sélectionnées pour illustrer nos recettes de chawarmas, burgers, grillades et attiéké.
        </p>

        <div className="pt-8 border-t border-white/10 text-xs text-white/60">
          © {new Date().getFullYear()} ORTHI DÉLICES. Tous droits réservés. Cotonou, Bénin.
        </div>

      </div>
    </footer>
  );
};
