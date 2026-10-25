import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check, Play, Pause, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../utils/order';

interface FeaturedCarouselProps {
  dishes: MenuItem[];
  onAddToCart: (dish: MenuItem) => void;
  onQuickOrder: (dish: MenuItem) => void;
  cartItemIds: Set<string>;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  dishes,
  onAddToCart,
  onQuickOrder,
  cartItemIds,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = dishes.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay functionality with smooth interval
  useEffect(() => {
    if (isPlaying && total > 1) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying, currentIndex, total]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const currentDish = dishes[currentIndex];
  const isAdded = currentDish ? cartItemIds.has(currentDish.id) : false;

  if (!dishes.length) return null;

  return (
    <div id="phares" className="py-6 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174B35]/10 text-[#174B35] font-extrabold text-xs tracking-wider uppercase mb-3">
          ⭐ SÉLECTION DU CHEF
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight mb-3">
          Nos 5 Plats Phares du Moment
        </h2>
        <p className="text-[#656C65] text-sm sm:text-base">
          Faites défiler pour découvrir les recettes signature les plus appréciées d'ORTHI DÉLICES à Cococodji.
        </p>
      </div>

      {/* Main Interactive Carousel Container */}
      <div 
        className="relative max-w-4xl mx-auto px-2 sm:px-6"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden rounded-2xl bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Carousel Image Side */}
            <div className="md:col-span-7 relative bg-[#E9E2D3] h-64 sm:h-80 md:h-auto min-h-[260px] md:min-h-[460px] overflow-hidden">
              <img
                src={currentDish.image}
                alt={currentDish.name}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />

              {/* Gradient Overlay for contrast on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden"></div>

              {/* Badges on Image */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
                {currentDish.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#E88A32] text-white font-black text-xs shadow-md">
                    {currentDish.badge}
                  </span>
                )}
                {currentDish.isNew && (
                  <span className="px-3 py-1 rounded-full bg-[#174B35] text-white font-black text-xs shadow-md">
                    NOUVEAU
                  </span>
                )}
              </div>

              {/* Price Overlay on Mobile */}
              <div className="absolute bottom-3 left-4 md:hidden text-white z-10">
                <span className="text-xl font-black drop-shadow-md bg-black/40 px-2.5 py-1 rounded-md">
                  {currentDish.priceDisplay}
                </span>
              </div>

              {/* Mobile in-image navigation arrows */}
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none md:hidden z-20">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all focus:outline-none"
                  aria-label="Plat précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all focus:outline-none"
                  aria-label="Plat suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Carousel Content Side */}
            <div className="md:col-span-5 p-5 sm:p-7 flex flex-col justify-between bg-transparent">
              <div>
                {/* Index / Category */}
                <div className="flex items-center justify-between text-xs font-bold text-[#656C65] uppercase tracking-wider mb-2">
                  <span className="text-[#E88A32] font-black">{currentDish.category}</span>
                  <span className="bg-[#E9E2D3]/60 px-2.5 py-1 rounded-md text-[#174B35] font-extrabold border border-[#8c6b45]/20">
                    Plat {currentIndex + 1} / {total}
                  </span>
                </div>

                {/* Dish Name */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#174B35] tracking-tight mb-2 sm:mb-3">
                  {currentDish.name}
                </h3>

                {/* Price (Desktop) */}
                <div className="hidden md:block text-2xl font-extrabold text-[#E88A32] mb-3">
                  {currentDish.priceDisplay}
                </div>

                {/* Description */}
                <p className="text-[#656C65] text-xs sm:text-sm leading-relaxed mb-4">
                  {currentDish.description}
                </p>

                {/* Tags */}
                {currentDish.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {currentDish.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#E9E2D3]/60 text-[#174B35] font-bold border border-[#8c6b45]/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3 border-t border-[#DEDFD7]/70">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onAddToCart(currentDish)}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md font-bold text-sm transition-all shadow-sm ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#174B35] hover:bg-[#103526] text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-200" />
                        <span>Dans la commande</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-[#E88A32]" />
                        <span>Ajouter au panier</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickOrder(currentDish)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md border-2 border-[#E88A32] text-[#E88A32] hover:bg-[#E88A32] hover:text-white font-bold text-sm transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Commander vite</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#656C65] text-center italic">
                  👆 Glissez sur l'écran ou utilisez les flèches pour défiler
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Desktop Carousel Arrow Controls */}
        <button
          type="button"
          onClick={prevSlide}
          className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#174B35] border border-[#DEDFD7] shadow-xl items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 focus:outline-none focus:ring-2 focus:ring-[#E88A32]"
          aria-label="Plat précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#174B35] border border-[#DEDFD7] shadow-xl items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 focus:outline-none focus:ring-2 focus:ring-[#E88A32]"
          aria-label="Plat suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Pagination Dots & Play/Pause */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-[#656C65] hover:text-[#174B35] transition-colors focus:outline-none"
            aria-label={isPlaying ? "Mettre en pause le carrousel" : "Démarrer le défilement automatique"}
            title={isPlaying ? "Pause" : "Lecture automatique"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2">
            {dishes.map((dish, idx) => (
              <button
                key={dish.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full focus:outline-none ${
                  currentIndex === idx
                    ? 'w-7 h-2.5 bg-[#E88A32]'
                    : 'w-2.5 h-2.5 bg-[#DEDFD7] hover:bg-[#656C65]'
                }`}
                aria-label={`Aller au plat ${idx + 1} : ${dish.name}`}
                aria-current={currentIndex === idx ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
