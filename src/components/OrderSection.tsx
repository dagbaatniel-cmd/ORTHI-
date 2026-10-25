import React, { useState } from 'react';
import { 
  MessageCircle, 
  Trash2, 
  Plus, 
  Minus, 
  Copy, 
  Check, 
  MapPin, 
  User, 
  Phone, 
  FileText,
  AlertCircle 
} from 'lucide-react';
import { 
  CartItem, 
  calculateCartTotal, 
  calculateCartItemCount, 
  generateWhatsAppMessage, 
  createWhatsAppUrl, 
  RESTAURANT_PHONE, 
  RESTAURANT_PHONE_DISPLAY,
  formatFCFA
} from '../utils/order';

interface OrderSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [customOrderText, setCustomOrderText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cartTotal = calculateCartTotal(cart);
  const cartCount = calculateCartItemCount(cart);

  // Generate live WhatsApp preview
  const currentMessage = generateWhatsAppMessage({
    customerName: customerName || '[Votre Nom]',
    location: location || '[Lieu de livraison ou retrait]',
    phone: phone || '',
    customNotes: customNotes || '',
    cartItems: cart,
    customOrderText: customOrderText || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Veuillez indiquer votre nom.');
      return;
    }

    if (!location.trim()) {
      setErrorMessage('Veuillez indiquer le lieu de livraison ou de retrait.');
      return;
    }

    if (cart.length === 0 && !customOrderText.trim()) {
      setErrorMessage('Votre commande est vide. Sélectionnez un plat dans la carte ou écrivez votre demande dans le champ texte.');
      return;
    }

    const finalMessage = generateWhatsAppMessage({
      customerName,
      location,
      phone,
      customNotes,
      cartItems: cart,
      customOrderText
    });

    const whatsappUrl = createWhatsAppUrl(finalMessage, RESTAURANT_PHONE);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="commander" className="py-16 lg:py-24 bg-[#174B35] text-white">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-black tracking-[0.2em] text-[#E88A32] uppercase mb-2">
            COMMANDE DIRECTE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Envie de vous régaler ?
          </h2>
          <p className="text-white/80 text-base">
            Sélectionnez vos plats et complétez les informations. Le site prépare votre message instantané pour commander sur WhatsApp.
          </p>
        </div>

        {/* Order Main Card */}
        <div className="bg-[#faf6ee]/95 backdrop-blur-xs text-[#202720] rounded-2xl p-6 sm:p-10 shadow-2xl border border-[#8c6b45]/30">
          
          {/* Cart Items Section */}
          <div className="mb-8 pb-8 border-b border-[#8c6b45]/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-[#174B35] flex items-center gap-2">
                <span>Vos Plats Sélectionnés</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#174B35] text-white">
                  {cartCount} {cartCount > 1 ? 'articles' : 'article'}
                </span>
              </h3>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vider la sélection</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#faf6ee]/70 border border-dashed border-[#8c6b45]/30 text-center">
                <p className="text-sm text-[#656C65] font-medium mb-2">
                  Aucun plat n'a été ajouté depuis la carte pour le moment.
                </p>
                <a
                  href="#carte"
                  className="inline-block text-xs font-black text-[#E88A32] hover:underline"
                >
                  👉 Parcourir la carte et choisir vos chawarmas ou burgers
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-[#faf6ee]/90 border border-[#8c6b45]/30 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#E9E2D3]"
                      />
                      <div>
                        <h4 className="text-sm font-black text-[#174B35]">{ci.item.name}</h4>
                        <span className="text-xs text-[#E88A32] font-extrabold">
                          {ci.item.price > 0 ? formatFCFA(ci.item.price * ci.quantity) : ci.item.priceDisplay}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="flex items-center gap-1 bg-[#F8F5ED] rounded-lg p-1 border border-[#DEDFD7]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(ci.item.id, -1)}
                          className="w-6 h-6 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-xs font-bold text-[#174B35]"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-[#174B35]">
                          {ci.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(ci.item.id, 1)}
                          className="w-6 h-6 rounded bg-[#174B35] text-white flex items-center justify-center text-xs font-bold"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(ci.item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`Supprimer ${ci.item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {cartTotal > 0 && (
                  <div className="flex items-center justify-between pt-3 px-1">
                    <span className="text-sm font-bold text-[#656C65]">Total estimé des plats :</span>
                    <span className="text-xl font-black text-[#174B35]">{formatFCFA(cartTotal)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Custom order text or free text */}
            <div>
              <label htmlFor="customer-order-text" className="block text-xs font-black uppercase text-[#174B35] tracking-wider mb-1.5">
                {cart.length > 0 ? "Demandes ou plats supplémentaires (Optionnel)" : "Votre commande par écrit *"}
              </label>
              <textarea
                id="customer-order-text"
                rows={2}
                value={customOrderText}
                onChange={(e) => setCustomOrderText(e.target.value)}
                placeholder="Exemple : 2 Chawarmas Crunch frites + 1 Bacon Cheeseburger + 1 Coca bien glacé..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DEDFD7] text-sm text-[#202720] focus:ring-2 focus:ring-[#174B35] focus:outline-none"
              />
            </div>

            {/* Customer Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer-name-input" className="block text-xs font-black uppercase text-[#174B35] tracking-wider mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#E88A32]" />
                  <span>Votre Nom et Prénom *</span>
                </label>
                <input
                  id="customer-name-input"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex : Koffi Mensah"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DEDFD7] text-sm text-[#202720] focus:ring-2 focus:ring-[#174B35] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="customer-location-input" className="block text-xs font-black uppercase text-[#174B35] tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E88A32]" />
                  <span>Lieu de livraison ou retrait à Cococodji *</span>
                </label>
                <input
                  id="customer-location-input"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex : Cococodji, face pharmacie / À emporter"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DEDFD7] text-sm text-[#202720] focus:ring-2 focus:ring-[#174B35] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="customer-phone-input" className="block text-xs font-black uppercase text-[#174B35] tracking-wider mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#E88A32]" />
                  <span>Votre Numéro de Téléphone (Optionnel)</span>
                </label>
                <input
                  id="customer-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex : +229 01 23 45 67"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DEDFD7] text-sm text-[#202720] focus:ring-2 focus:ring-[#174B35] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="customer-notes-input" className="block text-xs font-black uppercase text-[#174B35] tracking-wider mb-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#E88A32]" />
                  <span>Préférences de cuisson ou piment (Optionnel)</span>
                </label>
                <input
                  id="customer-notes-input"
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Ex : Sans piment, oignons à part, sauce piquante..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DEDFD7] text-sm text-[#202720] focus:ring-2 focus:ring-[#174B35] focus:outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Message Preview Accordion */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#656C65] mb-1.5">
                <span>Aperçu du message envoyé sur WhatsApp :</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[#174B35] hover:text-[#E88A32] font-semibold"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Message copié !' : 'Copier'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-white border border-[#DEDFD7] text-xs font-mono text-[#202720] whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                {currentMessage}
              </pre>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#174B35] hover:bg-[#103526] text-white font-black text-base shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 text-[#E88A32]" />
                <span>Envoyer ma commande sur WhatsApp ({RESTAURANT_PHONE_DISPLAY})</span>
              </button>
            </div>

          </form>

          <p className="mt-4 text-center text-xs text-[#656C65]">
            💬 Le message s'ouvrira directement dans l'application WhatsApp. Vous pourrez échanger avec notre équipe pour préciser l'heure exacte et les frais de livraison éventuels.
          </p>

        </div>
      </div>
    </section>
  );
};
