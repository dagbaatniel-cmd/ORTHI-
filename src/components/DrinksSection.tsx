import React, { useState } from 'react';
import { Wine, Beer, Sparkles, Plus, Minus, Check, GlassWater } from 'lucide-react';
import { MenuItem } from '../utils/order';

interface DrinksSectionProps {
  drinks: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  cartMap: Map<string, number>;
}

export const DrinksSection: React.FC<DrinksSectionProps> = ({
  drinks,
  onAddToCart,
  onUpdateQuantity,
  cartMap,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'Toutes les boissons', icon: GlassWater },
    { id: 'smoothie', label: '🍓 Smoothies', icon: Sparkles },
    { id: 'jus', label: '🌺 Bissap & Ananas', icon: Sparkles },
    { id: 'sobebra', label: '🍺 Bières SOBEBRA', icon: Beer },
    { id: 'vin', label: '🍷 Vins & Cocktails', icon: Wine },
  ];

  const filteredDrinks = drinks.filter((drink) => {
    if (filter === 'all') return true;
    if (filter === 'smoothie') return drink.id.includes('smoothie');
    if (filter === 'jus') return drink.id.includes('bissap') || drink.id.includes('ananas');
    if (filter === 'sobebra') return drink.id.includes('sobebra');
    if (filter === 'vin') return drink.id.includes('vin') || drink.id.includes('cocktail');
    return true;
  });

  return (
    <section id="boissons" className="py-16 lg:py-24 bg-[#174B35]/95 text-white relative overflow-hidden scroll-mt-20">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E88A32]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E88A32] text-white text-xs font-black uppercase tracking-wider mb-3">
            <Beer className="w-3.5 h-3.5" />
            ESPACE BAR & RAFRAÎCHISSEMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Smoothies, Jus Locaux, SOBEBRA & Vins
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            Accompagnez vos chawarmas et grillades avec nos smoothies mixés minute, notre bissap royal, le pur jus d'ananas d'Allada, les bières fraîches de la SOBEBRA ou notre sélection de vins.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
                  isActive
                    ? 'bg-[#E88A32] text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDrinks.map((drink) => {
            const quantityInCart = cartMap.get(drink.id) || 0;

            return (
              <article
                key={drink.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#faf6ee]/95 text-[#202720] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-[#8c6b45]/30"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-[#E9E2D3] overflow-hidden">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {drink.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#174B35] text-white text-[11px] font-black shadow">
                      {drink.badge}
                    </span>
                  )}
                  {drink.isNew && (
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#E88A32] text-white text-[11px] font-black shadow">
                      NOUVEAU
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-[#174B35] leading-snug mb-1.5">
                      {drink.name}
                    </h3>
                    <p className="text-xs text-[#656C65] leading-relaxed mb-3 line-clamp-2">
                      {drink.description}
                    </p>

                    {/* Tags */}
                    {drink.tags && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {drink.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#F8F5ED] text-[#174B35] border border-[#DEDFD7]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#DEDFD7] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#656C65] block font-medium">Prix frais</span>
                      <span className="text-base font-black text-[#174B35]">
                        {drink.priceDisplay}
                      </span>
                    </div>

                    {quantityInCart > 0 ? (
                      <div className="flex items-center gap-1.5 bg-[#F8F5ED] border border-[#174B35] rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(drink.id, -1)}
                          className="w-6 h-6 rounded bg-white hover:bg-gray-100 text-[#174B35] flex items-center justify-center font-bold"
                          aria-label={`Diminuer ${drink.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black px-1 text-[#174B35]">
                          {quantityInCart}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(drink.id, 1)}
                          className="w-6 h-6 rounded bg-[#174B35] text-white flex items-center justify-center font-bold"
                          aria-label={`Augmenter ${drink.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart(drink)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#174B35] hover:bg-[#103526] text-white text-xs font-bold transition-all active:scale-95 shadow"
                        aria-label={`Ajouter ${drink.name} à la commande`}
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E88A32]" />
                        <span>Ajouter</span>
                      </button>
                    )}
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Reassurance note */}
        <p className="mt-8 text-center text-xs text-white/70 italic">
          🧊 Toutes nos boissons sont servies bien fraîches avec glaçons sur demande. Les bières SOBEBRA sont servies frappées.
        </p>

      </div>
    </section>
  );
};
