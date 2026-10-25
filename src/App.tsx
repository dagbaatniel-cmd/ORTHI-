import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { OrderSection } from './components/OrderSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';
import { DrinksSection } from './components/DrinksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FEATURED_DISHES, ALL_MENU_ITEMS, BAR_DRINKS } from './data/menuData';
import { CartItem, MenuItem, calculateCartItemCount } from './utils/order';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('confidentialite');

  // Quick lookup structures for cart
  const cartMap = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach((ci) => map.set(ci.item.id, ci.quantity));
    return map;
  }, [cart]);

  const cartItemIds = useMemo(() => {
    return new Set(cart.map((ci) => ci.item.id));
  }, [cart]);

  const cartCount = useMemo(() => {
    return calculateCartItemCount(cart);
  }, [cart]);

  // Add to cart handler
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  // Remove single item
  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Quick order from carousel or button
  const handleQuickOrder = (dish: MenuItem) => {
    handleAddToCart(dish);
    const orderElem = document.getElementById('commander');
    if (orderElem) {
      orderElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open order section
  const handleOpenOrder = () => {
    const orderElem = document.getElementById('commander');
    if (orderElem) {
      orderElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Legal dialog
  const handleOpenLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#202720]">
      {/* Skip to Content for Accessibility */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#174B35] focus:text-white focus:rounded-md focus:shadow-xl focus:font-bold"
      >
        Aller au contenu principal
      </a>

      {/* Navigation Header */}
      <Navbar cartCount={cartCount} onOpenOrder={handleOpenOrder} />

      {/* Main Content */}
      <main id="contenu" className="flex-1">
        {/* Hero Section */}
        <Hero onOrderClick={handleOpenOrder} />

        {/* Interactive Featured Carousel in Carte Section (Plats Phares) */}
        <section className="py-10 bg-transparent border-t border-[#8c6b45]/30">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <FeaturedCarousel
              dishes={FEATURED_DISHES}
              onAddToCart={handleAddToCart}
              onQuickOrder={handleQuickOrder}
              cartItemIds={cartItemIds}
            />
          </div>
        </section>

        {/* Complete Menu Section with category tabs, search & burger spotlight */}
        <MenuSection
          items={ALL_MENU_ITEMS}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          cartMap={cartMap}
          onOpenOrder={handleOpenOrder}
        />

        {/* Espace Bar, Smoothies, Jus Locaux, SOBEBRA & Vins */}
        <DrinksSection
          drinks={BAR_DRINKS}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          cartMap={cartMap}
        />

        {/* About Restaurant & Authentic Ambiance Section */}
        <AboutSection onContactClick={handleOpenOrder} />

        {/* Section Témoignages & Avis Clients */}
        <TestimonialsSection onOrderClick={handleOpenOrder} />

        {/* Direct WhatsApp Ordering Form & Cart Section */}
        <OrderSection
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* Location & Map Section */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onOpenCookieSettings={() => handleOpenLegal('cookies')}
      />

      {/* Legal & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        activeTab={activeLegalTab}
        onClose={() => setLegalModalOpen(false)}
        onTabChange={(tab) => setActiveLegalTab(tab)}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenCookiesPolicy={() => handleOpenLegal('cookies')} />
    </div>
  );
}
