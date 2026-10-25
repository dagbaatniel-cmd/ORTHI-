import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  ThumbsUp, 
  CheckCircle2, 
  MessageSquareHeart, 
  ShoppingBag, 
  Sparkles,
  MapPin,
  Clock,
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { RESTAURANT_PHONE } from '../utils/order';

interface Review {
  id: string;
  name: string;
  roleOrLocation: string;
  avatarBg: string;
  avatarText: string;
  rating: number;
  date: string;
  dishOrdered: string;
  category: 'chawarma-burger' | 'grillades' | 'boissons' | 'livraison';
  comment: string;
  initialLikes: number;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Amina Diallo',
    roleOrLocation: 'Cotonou Cadjèhoun',
    avatarBg: 'bg-[#174B35]',
    avatarText: 'AD',
    rating: 5,
    date: 'Il y a 2 jours',
    dishOrdered: 'Chawarma Crunch & Jus de Bissap Glacé',
    category: 'chawarma-burger',
    comment: "Le Chawarma Crunch porte tellement bien son nom ! La pâte est croustillante, la viande parfumée et la sauce blanche ail maison est un pur chef-d'œuvre. Livré à Cadjèhoun encore tout chaud avec le bissap bien frais. C'est devenu notre rituel du vendredi soir !",
    initialLikes: 24,
  },
  {
    id: 'rev-2',
    name: 'Éric Kouassi',
    roleOrLocation: 'Cococodji (près carrefour)',
    avatarBg: 'bg-[#E88A32]',
    avatarText: 'EK',
    rating: 5,
    date: 'Il y a 4 jours',
    dishOrdered: 'Bacon Cheeseburger Gourmand & Frites Maison',
    category: 'chawarma-burger',
    comment: "Habitant juste à côté à Cococodji, je viens régulièrement sur place. Le pain brioché du Bacon Cheeseburger est ultra moelleux, la viande de bœuf est juteuse et bien grillée à la flamme. Rien à voir avec le fast-food ordinaire, c’est de la vraie cuisine généreuse !",
    initialLikes: 19,
  },
  {
    id: 'rev-3',
    name: 'Chantal Agbodjan',
    roleOrLocation: 'Calavi Arconville',
    avatarBg: 'bg-[#103526]',
    avatarText: 'CA',
    rating: 5,
    date: 'La semaine dernière',
    dishOrdered: 'Poulet Braisé Fermier & Alloco d’Or',
    category: 'grillades',
    comment: "Nous avons commandé pour toute la famille dimanche midi : 2 portions de poulet braisé avec alloco et attiéké doré. Assaisonnement impeccable, marinade aux épices douces et bananes plantains fondantes. Livraison soignée et ponctuelle.",
    initialLikes: 31,
  },
  {
    id: 'rev-4',
    name: 'Romaric Boco',
    roleOrLocation: 'Cotonou Akpakpa',
    avatarBg: 'bg-[#8F3D18]',
    avatarText: 'RB',
    rating: 5,
    date: 'Il y a 10 jours',
    dishOrdered: 'Capitaine Braisé & SOBEBRA La Béninoise',
    category: 'grillades',
    comment: "Le poisson braisé capitaine est d’une fraîcheur remarquable. Chair tendre, peau croustillante aux herbes locales et oignons sautés. Accompagné d'une Béninoise SOBEBRA bien glacée sur la terrasse en soirée, on se régale !",
    initialLikes: 17,
  },
  {
    id: 'rev-5',
    name: 'Dr. Nadine Tokpo',
    roleOrLocation: 'Cococodji Résidentiel',
    avatarBg: 'bg-[#174B35]',
    avatarText: 'NT',
    rating: 5,
    date: 'Il y a 2 semaines',
    dishOrdered: 'Smoothie Vitalité Mangue-Passion & Chawarma Light',
    category: 'boissons',
    comment: "Enfin une adresse où l'on sert de véritables smoothies naturels préparés à la minute avec les fruits mûrs du Bénin, sans sucre superflu ni concentré chimique. Équipe chaleureuse, respect strict de l’hygiène alimentaire.",
    initialLikes: 22,
  },
  {
    id: 'rev-6',
    name: 'Sylvain Mensah',
    roleOrLocation: 'Fidjrossè Plage',
    avatarBg: 'bg-[#2D6A4F]',
    avatarText: 'SM',
    rating: 5,
    date: 'Il y a 2 semaines',
    dishOrdered: 'Double Burger Barbecue & Jus d’Ananas d’Allada',
    category: 'livraison',
    comment: "Commande passée un soir de match via WhatsApp. Réponse en 2 minutes chrono, suivi précis et livraison express en moins de 35 minutes avec le sac thermique bien chaud. Les portions sont copieuses et les prix très honnêtes.",
    initialLikes: 28,
  },
];

interface TestimonialsSectionProps {
  onOrderClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOrderClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    REVIEWS.forEach((r) => {
      initial[r.id] = r.initialLikes;
    });
    return initial;
  });

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => {
      const isLiked = !prev[id];
      setLikeCounts((c) => ({
        ...c,
        [id]: c[id] + (isLiked ? 1 : -1),
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const filteredReviews = activeCategory === 'all' 
    ? REVIEWS 
    : REVIEWS.filter((r) => r.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Tous les avis (6)' },
    { id: 'chawarma-burger', label: 'Chawarmas & Burgers' },
    { id: 'grillades', label: 'Grillades & Poissons' },
    { id: 'boissons', label: 'Boissons & Smoothies' },
    { id: 'livraison', label: 'Livraison Express' },
  ];

  const handleLeaveReviewWhatsApp = () => {
    const msg = encodeURIComponent(
      "Bonjour ORTHI DÉLICES ! Je souhaite partager mon avis et mon expérience sur ma récente commande chez vous."
    );
    window.open(`https://wa.me/${RESTAURANT_PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="avis" className="py-16 lg:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#174B35]/10 border border-[#174B35]/20 text-[#174B35] text-xs font-black tracking-wider uppercase mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5 text-[#E88A32]" />
          <span>Témoignages & Confiance</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#174B35] tracking-tight">
          Ce que disent nos <span className="text-[#E88A32]">clients fidèles</span>
        </h2>
        
        <p className="mt-3 text-[#5A635A] text-sm sm:text-base leading-relaxed">
          La satisfaction de nos convives à Cococodji, Calavi et Cotonou est notre plus belle récompense. 
          Des saveurs généreuses, des produits frais et un service avec le sourire.
        </p>
      </div>

      {/* Social Proof Key Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
        <div className="bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 rounded-xl p-4 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1 text-[#E88A32] mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#E88A32] text-[#E88A32]" />
            ))}
          </div>
          <div className="text-2xl font-black text-[#174B35]">4.9 / 5</div>
          <div className="text-[11px] font-bold text-[#656C65] uppercase tracking-wider mt-0.5">
            +280 avis vérifiés
          </div>
        </div>

        <div className="bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 rounded-xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#174B35]/10 text-[#174B35] flex items-center justify-center mx-auto mb-1">
            <HeartHandshake className="w-4 h-4 text-[#E88A32]" />
          </div>
          <div className="text-2xl font-black text-[#174B35]">99%</div>
          <div className="text-[11px] font-bold text-[#656C65] uppercase tracking-wider mt-0.5">
            Recommandation client
          </div>
        </div>

        <div className="bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 rounded-xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#174B35]/10 text-[#174B35] flex items-center justify-center mx-auto mb-1">
            <Clock className="w-4 h-4 text-[#E88A32]" />
          </div>
          <div className="text-2xl font-black text-[#174B35]">30-45 min</div>
          <div className="text-[11px] font-bold text-[#656C65] uppercase tracking-wider mt-0.5">
            Livraison express à chaud
          </div>
        </div>

        <div className="bg-[#faf6ee]/90 backdrop-blur-xs border border-[#8c6b45]/30 rounded-xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#174B35]/10 text-[#174B35] flex items-center justify-center mx-auto mb-1">
            <ShieldCheck className="w-4 h-4 text-[#E88A32]" />
          </div>
          <div className="text-2xl font-black text-[#174B35]">100% Frais</div>
          <div className="text-[11px] font-bold text-[#656C65] uppercase tracking-wider mt-0.5">
            Préparé chaque matin
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-[#174B35] text-white shadow-sm ring-2 ring-[#E88A32]/40'
                : 'bg-[#faf6ee]/80 hover:bg-[#faf6ee] text-[#5A635A] border border-[#8c6b45]/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => {
          const isLiked = likedReviews[rev.id];
          const likesCount = likeCounts[rev.id] || rev.initialLikes;

          return (
            <article
              key={rev.id}
              className="bg-[#faf6ee]/90 backdrop-blur-xs rounded-2xl p-6 border border-[#8c6b45]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              {/* Quote Watermark Icon */}
              <div className="absolute top-5 right-5 text-[#174B35]/10 pointer-events-none group-hover:text-[#E88A32]/15 transition-colors">
                <Quote className="w-10 h-10 -rotate-12" />
              </div>

              <div>
                {/* Header: User Info & Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${rev.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0`}>
                      {rev.avatarText}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#174B35] leading-tight">
                        {rev.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#656C65] mt-0.5">
                        <MapPin className="w-3 h-3 text-[#E88A32] flex-shrink-0" />
                        <span>{rev.roleOrLocation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-[#E88A32] text-[#E88A32]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-black text-[#174B35] ml-1">
                      {rev.rating}.0
                    </span>
                  </div>

                  <span className="text-[11px] text-[#8A928A] font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Dish ordered pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F1EA] text-[#174B35] text-[11px] font-bold mb-3 border border-[#E4DEC9]">
                  <Sparkles className="w-3 h-3 text-[#E88A32]" />
                  <span>Plat dégusté : {rev.dishOrdered}</span>
                </div>

                {/* Comment Text */}
                <p className="text-[#3A423A] text-sm leading-relaxed italic relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              {/* Card Footer: Verified Status & Helpful Button */}
              <div className="pt-4 mt-4 border-t border-[#EBE8DF] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#174B35]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  Commande vérifiée
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleLike(rev.id)}
                  aria-label={`Marquer cet avis comme utile (actuellement ${likesCount})`}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                    isLiked
                      ? 'bg-[#E88A32]/15 text-[#E88A32]'
                      : 'text-[#656C65] hover:text-[#174B35] hover:bg-[#F0EDE4]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#E88A32]' : ''}`} />
                  <span>Utile ({likesCount})</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Call to action bar under reviews */}
      <div className="mt-12 bg-gradient-to-r from-[#174B35] to-[#103526] rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="max-w-xl text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black mb-1">
            Vous avez déjà goûté nos créations ?
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Partagez votre expérience avec nous sur WhatsApp ou passez commande pour découvrir nos nouveautés dès aujourd'hui !
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleLeaveReviewWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquareHeart className="w-4 h-4 text-[#E88A32]" />
            <span>Donner mon avis</span>
          </button>

          <button
            type="button"
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E88A32] hover:bg-[#D57B28] text-white font-black text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Commander maintenant</span>
          </button>
        </div>
      </div>
    </section>
  );
};
