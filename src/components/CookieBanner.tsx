import React, { useState, useEffect } from 'react';
import { Cookie, Check, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenCookiesPolicy: () => void;
}

const STORAGE_KEY = 'orthi-cookie-preferences';

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiesPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          necessary: true,
          analytics,
          marketing,
          savedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn('Cookie preferences could not be stored in localStorage', e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 p-5 rounded-2xl bg-white border border-[#DEDFD7] shadow-2xl border-l-4 border-l-[#E88A32] text-[#202720]"
      role="region"
      aria-label="Choix des cookies"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-xl bg-[#E88A32]/10 text-[#E88A32] flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black text-[#174B35]">
            Vos préférences de confidentialité
          </h3>
          <p className="text-xs text-[#656C65] mt-1 leading-relaxed">
            Nous utilisons le stockage local pour mémoriser vos choix et assurer la fluidité de vos commandes.
          </p>
          <button
            type="button"
            onClick={onOpenCookiesPolicy}
            className="text-[11px] text-[#E88A32] font-extrabold hover:underline mt-1 inline-block"
          >
            En savoir plus sur notre politique
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#DEDFD7]">
        <button
          type="button"
          onClick={() => savePreferences(false, false)}
          className="px-3 py-1.5 rounded-lg border border-[#DEDFD7] hover:bg-[#F8F5ED] text-xs font-bold text-[#656C65] transition-colors"
        >
          Refuser les facultatifs
        </button>
        <button
          type="button"
          onClick={() => savePreferences(true, true)}
          className="px-4 py-1.5 rounded-lg bg-[#174B35] hover:bg-[#103526] text-white text-xs font-bold transition-all shadow"
        >
          Accepter
        </button>
      </div>
    </aside>
  );
};
