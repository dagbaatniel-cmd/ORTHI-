import React, { useState } from 'react';
import { Plus, Minus, Check, Sparkles, Search } from 'lucide-react';
import { MenuItem } from '../utils/order';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  cartMap: Map<string, number>;
  onOpenOrder: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onAddToCart,
  onUpdateQuantity,
  cartMap,
  onOpenOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tous nos plats' },
    { id: 'chawarma', label: '🌯 Chawarmas' },
    { id: 'burger', label: '🍔 Nouveautés Burgers' },
    { id: 'grillade', label: '🍗 Grillades & Poissons' },
    { id: 'attieke', label: '🍚 Atchèkè & Alloco' },
    { id: 'boisson', label: '🥤 Boissons Fraîches' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="carte" className="py-16 lg:py-24 bg-transparent border-t border-b border-[#8c6b45]/30">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-black tracking-[0.2em] text-[#E88A32] uppercase mb-2">
            NOTRE SÉLECTION CULINAIRE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#174B35] tracking-tight mb-4">
            La Carte Complète d'ORTHI DÉLICES
          </h2>
          <p className="text-base text-[#656C65]">
            Chawarmas croustillants, burgers gourmands exclusifs, grillades braisées à point et accompagnements béninois traditionnels.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#174B35] text-white shadow-md'
                    : 'bg-[#faf6ee]/80 text-[#202720] hover:bg-[#E88A32]/15 hover:text-[#E88A32] border border-[#8c6b45]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#656C65] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un plat..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#faf6ee]/90 border border-[#8c6b45]/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#174B35]"
            />
          </div>
        </div>

        {/* Highlight Banner if Burger or All is selected */}
        {(selectedCategory === 'all' || selectedCategory === 'burger') && (
          <div id="nouveautes" className="mb-12 rounded-2xl bg-gradient-to-r from-[#174B35] to-[#103526] p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88A32] text-white text-xs font-black uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                NOUVEAUTÉ EXCLUSIVE
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-2">
                Les Burgers Gourmands arrivent chez ORTHI !
              </h3>
              <p className="text-sm sm:text-base text-emerald-100">
                Découvrez notre Bacon Cheeseburger avec double cheddar fondu et son menu complet avec frites fraîches et Coca-Cola glacé. Préparés minute à la commande !
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => setSelectedCategory('burger')}
                className="px-6 py-3 rounded-lg bg-[#E88A32] hover:bg-[#d47b28] text-white font-black text-sm shadow transition-transform hover:scale-105 active:scale-95"
              >
                Voir les Burgers
              </button>
            </div>
          </div>
        )}

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((dish) => {
            const quantityInCart = cartMap.get(dish.id) || 0;

            return (
              <article
                key={dish.id}
                className="group flex flex-col justify-between rounded-xl bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-[#E9E2D3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {dish.isNew && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E88A32] text-white text-[11px] font-black shadow">
                        NOUVEAU
                      </span>
                    )}
                    {dish.badge && !dish.isNew && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#174B35] text-white text-[11px] font-bold shadow">
                        {dish.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-black text-[#174B35] leading-snug">
                        {dish.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#656C65] leading-relaxed mb-4 line-clamp-3">
                      {dish.description}
                    </p>

                    {/* Tags */}
                    {dish.tags && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dish.tags.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase font-bold text-[#174B35]/70 bg-white px-2 py-0.5 rounded border border-[#DEDFD7]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="pt-3 border-t border-[#DEDFD7] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#656C65] block">Prix</span>
                      <span className="text-lg font-black text-[#174B35]">
                        {dish.priceDisplay}
                      </span>
                    </div>

                    {quantityInCart > 0 ? (
                      <div className="flex items-center gap-1.5 bg-white border border-[#174B35] rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(dish.id, -1)}
                          className="w-7 h-7 rounded bg-[#F8F5ED] hover:bg-[#E88A32]/20 text-[#174B35] flex items-center justify-center font-bold focus:outline-none"
                          aria-label={`Diminuer la quantité de ${dish.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black px-1.5 text-[#174B35]">
                          {quantityInCart}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(dish.id, 1)}
                          className="w-7 h-7 rounded bg-[#174B35] hover:bg-[#103526] text-white flex items-center justify-center font-bold focus:outline-none"
                          aria-label={`Augmenter la quantité de ${dish.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart(dish)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#174B35] hover:bg-[#103526] text-white text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
                        aria-label={`Ajouter ${dish.name} à la commande`}
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E88A32]" />
                        <span>Commander</span>
                      </button>
                    )}
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state if search has no results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-[#F8F5ED] rounded-xl border border-[#DEDFD7]">
            <p className="text-lg font-bold text-[#174B35] mb-2">Aucun plat trouvé</p>
            <p className="text-sm text-[#656C65] mb-4">
              Essayez une autre recherche ou réinitialisez les filtres.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#174B35] text-white rounded-md text-xs font-bold"
            >
              Afficher toute la carte
            </button>
          </div>
        )}

        {/* Note */}
        <p className="mt-12 text-center text-xs sm:text-sm text-[#656C65] max-w-2xl mx-auto italic">
          💡 Les prix et la disponibilité des grillades et poissons frais peuvent être ajustés selon la taille de la pièce du jour. Chaque commande est confirmée par le restaurant sur WhatsApp avant préparation.
        </p>

      </div>
    </section>
  );
};
