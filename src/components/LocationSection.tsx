import React from 'react';
import { MapPin, Clock, Phone, ExternalLink, Navigation } from 'lucide-react';
import { RESTAURANT_PHONE_DISPLAY, RESTAURANT_PHONE, RESTAURANT_LOCATION } from '../utils/order';

export const LocationSection: React.FC = () => {
  return (
    <section id="localisation" className="py-16 lg:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-black tracking-[0.2em] text-[#E88A32] uppercase mb-2">
          NOUS TROUVER À COTONOU
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#174B35] tracking-tight mb-4">
          ORTHI DÉLICES à Cococodji
        </h2>
        <p className="text-base text-[#656C65]">
          Venez déguster nos plats sur place dans une ambiance détendue ou commandez à emporter et en livraison.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Info Cards Side */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="p-6 rounded-2xl bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 shadow-sm">
            <div className="flex items-start gap-3.5 mb-2">
              <div className="p-2.5 rounded-xl bg-[#174B35]/10 text-[#174B35]">
                <MapPin className="w-5 h-5 text-[#E88A32]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#174B35]">Adresse du Restaurant</h3>
                <p className="text-sm text-[#202720] font-medium mt-1">
                  {RESTAURANT_LOCATION}
                </p>
                <p className="text-xs text-[#656C65] mt-0.5">
                  Quartier Cococodji, proche des grands axes de Cotonou & Abomey-Calavi.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 shadow-sm">
            <div className="flex items-start gap-3.5 mb-2">
              <div className="p-2.5 rounded-xl bg-[#174B35]/10 text-[#174B35]">
                <Clock className="w-5 h-5 text-[#E88A32]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#174B35]">Horaires d'Ouverture</h3>
                <p className="text-sm text-[#202720] font-semibold mt-1">
                  Lundi au Dimanche : 11h00 – 23h30
                </p>
                <p className="text-xs text-[#656C65] mt-0.5">
                  Service continu midi et soir, grillades chaudes jusqu'en fin de soirée.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 shadow-sm">
            <div className="flex items-start gap-3.5 mb-2">
              <div className="p-2.5 rounded-xl bg-[#174B35]/10 text-[#174B35]">
                <Phone className="w-5 h-5 text-[#E88A32]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#174B35]">Contact Direct & WhatsApp</h3>
                <a
                  href={`tel:+${RESTAURANT_PHONE}`}
                  className="text-base font-black text-[#E88A32] hover:underline block mt-1"
                >
                  {RESTAURANT_PHONE_DISPLAY}
                </a>
                <p className="text-xs text-[#656C65] mt-0.5">
                  Appel vocal ou message WhatsApp pour toute réservation et commande.
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=ORTHI+DELICES+Cococodji+Cotonou"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#174B35] hover:bg-[#103526] text-white font-bold text-sm shadow transition-all"
          >
            <Navigation className="w-4 h-4 text-[#E88A32]" />
            <span>Itinéraire sur Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>

        </div>

        {/* Map Side */}
        <div className="lg:col-span-7 h-full min-h-[380px] rounded-2xl overflow-hidden border border-[#DEDFD7] shadow-lg bg-[#E9E2D3]">
          <iframe
            title="Localisation de ORTHI DÉLICES à Cococodji, Cotonou"
            src="https://www.google.com/maps?q=restaurant+Cococodji+Cotonou+B%C3%A9nin&output=embed"
            className="w-full h-full min-h-[380px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
};
