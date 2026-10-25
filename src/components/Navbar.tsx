import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Phone, MessageSquare, GlassWater } from 'lucide-react';
import { RESTAURANT_PHONE_DISPLAY, RESTAURANT_PHONE } from '../utils/order';

interface NavbarProps {
  cartCount: number;
  onOpenOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Plats Phares', href: '#phares' },
    { label: 'Notre Carte', href: '#carte' },
    { label: 'Nouveautés Burgers', href: '#nouveautes' },
    { label: '🍹 Espace Boissons', href: '#boissons' },
    { label: 'Le Restaurant', href: '#restaurant' },
    { label: '⭐ Avis Clients', href: '#avis' },
    { label: 'Localisation', href: '#localisation' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#efe7d7]/85 backdrop-blur-md border-b border-[#8c6b45]/30 transition-all shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#accueil" 
          className="flex flex-col items-start text-[#174B35] group focus:outline-none"
          aria-label="Accueil ORTHI DÉLICES"
        >
          <span className="text-2xl sm:text-3xl font-black tracking-wider leading-none group-hover:text-[#E88A32] transition-colors">
            ORTHI
          </span>
          <span className="text-[11px] font-bold tracking-[0.35em] text-[#E88A32] group-hover:text-[#174B35] transition-colors mt-0.5">
            DÉLICES
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 text-[14px] font-bold text-[#202720]" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#E88A32] transition-colors focus:text-[#E88A32] focus:outline-none py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E88A32] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:+${RESTAURANT_PHONE}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#174B35] hover:text-[#E88A32] px-3 py-1.5 rounded-full border border-[#174B35]/20 hover:border-[#E88A32]/40 transition-colors bg-white/60"
            title={`Appeler le ${RESTAURANT_PHONE_DISPLAY}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#E88A32]" />
            <span className="hidden md:inline">{RESTAURANT_PHONE_DISPLAY}</span>
          </a>

          <button
            type="button"
            onClick={onOpenOrder}
            className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#174B35] hover:bg-[#103526] text-white font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-[#E88A32]"
            aria-label={`Voir la commande (${cartCount} plats)`}
          >
            <ShoppingBag className="w-4 h-4 text-[#E88A32]" />
            <span>Commander</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-black bg-[#E88A32] text-white rounded-full min-w-5 h-5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-[#174B35] hover:bg-[#E88A32]/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#E88A32]"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          id="mobile-menu" 
          className="xl:hidden border-t border-[#8c6b45]/30 bg-[#f4efe4]/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 text-base font-bold text-[#202720] hover:text-[#E88A32] hover:bg-[#E88A32]/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#DEDFD7] flex flex-col gap-2">
              <a
                href={`tel:+${RESTAURANT_PHONE}`}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#174B35]"
              >
                <Phone className="w-4 h-4 text-[#E88A32]" />
                <span>Appeler : {RESTAURANT_PHONE_DISPLAY}</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenOrder();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#174B35] text-white font-bold rounded-xl shadow"
              >
                <MessageSquare className="w-4 h-4 text-[#E88A32]" />
                <span>Passer commande sur WhatsApp</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
