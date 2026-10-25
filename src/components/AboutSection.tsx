import React from 'react';
import { Heart, Utensils, ShieldCheck, MapPin } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="restaurant" className="py-16 lg:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Image Side */}
        <div className="lg:col-span-6 relative">
          <div className="relative overflow-hidden rounded-2xl bg-[#E9E2D3] border border-[#DEDFD7] shadow-xl aspect-[4/3]">
            <img
              src="/assets/ambiance.jpg"
              alt="Terrasse animée et chaleureuse du restaurant le soir"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#103526]/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#E88A32] uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" />
                COCOCODJI · COTONOU
              </div>
              <p className="text-sm font-semibold text-white/90">
                Une ambiance conviviale pour partager de savoureux repas entre amis et en famille.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Side */}
        <div className="lg:col-span-6">
          <p className="text-xs font-black tracking-[0.2em] text-[#E88A32] uppercase mb-3">
            NOTRE HISTOIRE & ENGAGEMENT
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#174B35] tracking-tight mb-5 leading-tight">
            Un bon repas, simplement et avec amour.
          </h2>
          <p className="text-base text-[#656C65] leading-relaxed mb-6">
            ORTHI DÉLICES vous accueille à Cococodji, à Cotonou. Notre mission est de vous offrir une restauration de qualité, où chaque chawarma est généreusement garni, chaque grillade parfaitement dorée et chaque plat d'attiéké imprégné des vraies saveurs d'Afrique de l'Ouest.
          </p>

          {/* 3 Values */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#174B35]/10 text-[#174B35] flex-shrink-0 mt-0.5">
                <Utensils className="w-4 h-4 text-[#E88A32]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#174B35]">Fraîcheur & Générosité</h3>
                <p className="text-xs text-[#656C65]">Des portions copieuses et des légumes découpés chaque jour pour un croquant parfait.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#174B35]/10 text-[#174B35] flex-shrink-0 mt-0.5">
                <Heart className="w-4 h-4 text-[#E88A32]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#174B35]">Saveurs Épicées et Équilibrées</h3>
                <p className="text-xs text-[#656C65]">Marinades maison à base d'aromates locaux, piment selon votre tolérance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#174B35]/10 text-[#174B35] flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#E88A32]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#174B35]">Service Réactif & Chaleureux</h3>
                <p className="text-xs text-[#656C65]">Prise de commande rapide en direct sur WhatsApp avec suivi de votre livraison.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[#174B35] hover:bg-[#103526] text-white font-bold text-sm shadow transition-all hover:-translate-y-0.5"
          >
            Nous contacter ou commander
          </button>
        </div>

      </div>
    </section>
  );
};
