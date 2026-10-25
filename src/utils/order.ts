/**
 * Pure helper logic for ORTHI DÉLICES
 * WhatsApp message generation, cart calculations, and menu utilities.
 */

export const RESTAURANT_PHONE = "2290154222345";
export const RESTAURANT_PHONE_DISPLAY = "+229 01 54 22 23 45";
export const RESTAURANT_LOCATION = "Cococodji, Cotonou, Bénin";

export interface MenuItem {
  id: string;
  name: string;
  category: 'chawarma' | 'burger' | 'grillade' | 'attieke' | 'boisson';
  description: string;
  price: number; // in FCFA (0 if price to confirm)
  priceDisplay: string;
  image: string;
  isNew?: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  badge?: string;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  location: string;
  phone?: string;
  customNotes?: string;
  cartItems?: CartItem[];
  customOrderText?: string;
}

/**
 * Formats a number with standard space separator for thousands
 */
export function formatFCFA(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
}

/**
 * Calculates the total sum in FCFA for items in the cart
 */
export function calculateCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((acc, current) => {
    return acc + (current.item.price > 0 ? current.item.price * current.quantity : 0);
  }, 0);
}

/**
 * Calculates total number of items
 */
export function calculateCartItemCount(cartItems: CartItem[]): number {
  return cartItems.reduce((acc, current) => acc + current.quantity, 0);
}

/**
 * Generates formatted WhatsApp order message
 */
export function generateWhatsAppMessage(details: OrderDetails): string {
  const lines: string[] = [
    "Bonjour ORTHI DÉLICES 🍽️,",
    "",
    "Je souhaite passer une commande :",
    ""
  ];

  if (details.cartItems && details.cartItems.length > 0) {
    details.cartItems.forEach((ci) => {
      const priceText = ci.item.price > 0 
        ? formatFCFA(ci.item.price * ci.quantity)
        : "Prix selon taille";
      lines.push(`• ${ci.quantity}x ${ci.item.name} (${priceText})`);
    });

    const total = calculateCartTotal(details.cartItems);
    if (total > 0) {
      lines.push("");
      lines.push(`💰 Total estimé : ${formatFCFA(total)}`);
    }
  }

  if (details.customOrderText && details.customOrderText.trim()) {
    if (details.cartItems && details.cartItems.length > 0) {
      lines.push("");
      lines.push("Demandes supplémentaires :");
    }
    lines.push(details.customOrderText.trim());
  }

  lines.push("");
  lines.push(`👤 Nom du client : ${details.customerName.trim()}`);
  lines.push(`📍 Lieu de livraison / retrait : ${details.location.trim()}`);

  if (details.phone && details.phone.trim()) {
    lines.push(`📞 Contact : ${details.phone.trim()}`);
  }

  if (details.customNotes && details.customNotes.trim()) {
    lines.push(`📝 Préférences : ${details.customNotes.trim()}`);
  }

  lines.push("");
  lines.push("Merci de me confirmer la disponibilité et le délai de préparation !");

  return lines.join("\n");
}

/**
 * Creates the full wa.me direct URL
 */
export function createWhatsAppUrl(message: string, phoneNumber: string = RESTAURANT_PHONE): string {
  const sanitizedPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Filters items by category
 */
export function filterMenuItems(items: MenuItem[], category: string): MenuItem[] {
  if (category === 'all' || !category) {
    return items;
  }
  return items.filter((item) => item.category === category);
}
