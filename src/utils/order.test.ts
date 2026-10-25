import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotal,
  calculateCartItemCount,
  generateWhatsAppMessage,
  createWhatsAppUrl,
  filterMenuItems,
  MenuItem,
  CartItem
} from './order';

const mockItems: MenuItem[] = [
  {
    id: 'chawarma-light',
    name: 'Chawarma Light',
    category: 'chawarma',
    description: 'Poulet mariné et légumes frais',
    price: 1000,
    priceDisplay: '1 000 FCFA',
    image: '/assets/chawarma-light.jpg'
  },
  {
    id: 'bacon-cheeseburger',
    name: 'Bacon Cheeseburger Gourmand',
    category: 'burger',
    description: 'Double cheddar fondu et bacon croustillant',
    price: 2500,
    priceDisplay: '2 500 FCFA',
    image: '/assets/burger-gourmet.jpg',
    isNew: true
  },
  {
    id: 'grillades-mix',
    name: 'Nos Grillades Braisées',
    category: 'grillade',
    description: 'Poulet et poisson selon arrivage',
    price: 0,
    priceDisplay: 'Selon taille',
    image: '/assets/grillades.jpg'
  }
];

test('calculateCartTotal calculates sum correctly for multiple items', () => {
  const cart: CartItem[] = [
    { item: mockItems[0], quantity: 2 }, // 2 * 1000 = 2000
    { item: mockItems[1], quantity: 1 }  // 1 * 2500 = 2500
  ];
  assert.equal(calculateCartTotal(cart), 4500);
});

test('calculateCartTotal handles zero price / custom price dishes without error', () => {
  const cart: CartItem[] = [
    { item: mockItems[2], quantity: 2 } // price 0
  ];
  assert.equal(calculateCartTotal(cart), 0);
});

test('calculateCartItemCount calculates total items', () => {
  const cart: CartItem[] = [
    { item: mockItems[0], quantity: 3 },
    { item: mockItems[1], quantity: 2 }
  ];
  assert.equal(calculateCartItemCount(cart), 5);
});

test('generateWhatsAppMessage contains customer details and order lines', () => {
  const msg = generateWhatsAppMessage({
    customerName: 'Ablavi Mensah',
    location: 'Cococodji, face pharmacie',
    phone: '+229 97 00 00 00',
    cartItems: [
      { item: mockItems[0], quantity: 2 },
      { item: mockItems[1], quantity: 1 }
    ],
    customNotes: 'Sans piment svp'
  });

  assert.ok(msg.includes('Ablavi Mensah'), 'Contains customer name');
  assert.ok(msg.includes('Cococodji, face pharmacie'), 'Contains location');
  assert.ok(msg.includes('2x Chawarma Light'), 'Contains ordered item');
  assert.ok(msg.includes('4 500 FCFA'), 'Contains total price');
  assert.ok(msg.includes('Sans piment svp'), 'Contains special notes');
});

test('createWhatsAppUrl creates valid wa.me link with phone number and encoded text', () => {
  const url = createWhatsAppUrl('Bonjour!', '2290154222345');
  assert.equal(url, 'https://wa.me/2290154222345?text=Bonjour!');
});

test('filterMenuItems filters properly by category', () => {
  const burgers = filterMenuItems(mockItems, 'burger');
  assert.equal(burgers.length, 1);
  assert.equal(burgers[0].id, 'bacon-cheeseburger');

  const all = filterMenuItems(mockItems, 'all');
  assert.equal(all.length, 3);
});
