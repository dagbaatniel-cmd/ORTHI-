import React from 'react';
import { Flame, Clock, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <section id="accueil" className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E88A32]/15 border border-[#E88A32]/30 text-[#E88A32] font-black text-xs tracking-widest uppercase mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#E88A32] animate-pulse"></span>
              COCOCODJI · COTONOU · BÉNIN
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#174B35] tracking-tight leading-[1.1] mb-6">
              Le goût authentique qui vous rassemble.
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#656C65] font-normal leading-relaxed mb-8 max-w-2xl">
              Chawarmas croustillants généreux, burgers fondants smashés, grillades braisées au feu de bois, smoothies frais et boissons fraîches de la SOBEBRA. Savourez l’excellence culinaire à emporter ou en livraison rapide.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#174B35] hover:bg-[#103526] text-white font-bold text-base shadow-lg shadow-[#174B35]/20 hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 text-[#E88A32]" />
                <span>Commander sur WhatsApp</span>
              </button>

              <a
                href="#phares"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#faf6ee]/80 hover:bg-[#faf6ee] text-[#174B35] font-bold text-base border-2 border-[#174B35] transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <span>Nos Plats Phares</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#boissons"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#E88A32] hover:bg-[#d47b28] text-white font-bold text-base transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <span>Espace Bar & Smoothies</span>
              </a>
            </div>

            {/* 3 Reassurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#8c6b45]/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="p-2 rounded-full bg-[#174B35]/10 text-[#174B35]">
                  <Flame className="w-4 h-4 text-[#E88A32]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#174B35]">Grillades braisées</p>
                  <p className="text-[11px] text-[#656C65] hidden sm:block">Marinade secrète</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="p-2 rounded-full bg-[#174B35]/10 text-[#174B35]">
                  <Clock className="w-4 h-4 text-[#E88A32]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#174B35]">Préparé minute</p>
                  <p className="text-[11px] text-[#656C65] hidden sm:block">Ultra chaud & frais</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="p-2 rounded-full bg-[#174B35]/10 text-[#174B35]">
                  <Sparkles className="w-4 h-4 text-[#E88A32]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#174B35]">Livraison rapide</p>
                  <p className="text-[11px] text-[#656C65] hidden sm:block">Cotonou & Calavi</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image Column - Chic gourmet restaurant presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#174B35]/20 to-[#E88A32]/30 rounded-2xl blur-lg -z-10"></div>
              
              {/* Main Photo Card */}
              <div className="overflow-hidden rounded-2xl bg-[#faf6ee]/90 backdrop-blur-xs p-2.5 shadow-2xl border border-[#8c6b45]/30">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-[#E9E2D3]">
                  <img
                    src="/assets/chawarma-plate-chic.jpg"
                    alt="Chawarma Crunch aux frites dorées sur assiette de restaurant chez ORTHI DÉLICES"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    fetchPriority="high"
                  />
                  <div className="absolute top-3 left-3 bg-[#174B35]/95 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow">
                    <span className="w-2 h-2 rounded-full bg-[#E88A32]"></span>
                    Restaurant Chic à Cococodji
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#faf6ee]/95 backdrop-blur-sm text-[#174B35] px-3.5 py-1.5 rounded-lg text-xs font-black shadow-md border border-[#8c6b45]/30">
                    Spécialité Maison
                  </div>
                </div>
              </div>

              {/* Floating review/badge sticker */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 bg-[#faf6ee]/95 backdrop-blur-xs border border-[#8c6b45]/30 shadow-xl p-3.5 rounded-xl flex items-center gap-3 max-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-[#E88A32]/20 flex items-center justify-center flex-shrink-0 text-[#E88A32] font-black text-lg">
                  ⭐
                </div>
                <div>
                  <div className="text-xs font-black text-[#174B35]">Qualité & Fraîcheur</div>
                  <div className="text-[11px] text-[#656C65]">Chawarmas, burgers & grillades 5/5</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
