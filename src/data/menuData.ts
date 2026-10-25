import { MenuItem } from '../utils/order';

export const FEATURED_DISHES: MenuItem[] = [
  {
    id: 'chawarma-crunch',
    name: 'Chawarma Crunch aux Frites Dorées',
    category: 'chawarma',
    description: 'Pain lavash grillé et toasté, émincé généreux de poulet braisé aux épices secrètes, frites croustillantes à l’intérieur et sauce blanche maison.',
    price: 2000,
    priceDisplay: '2 000 FCFA',
    image: '/assets/chawarma-plate-chic.jpg',
    isPopular: true,
    badge: '🔥 Best-Seller du Soir',
    tags: ['Croustillant', 'Frites incluses', 'Sauce ail maison']
  },
  {
    id: 'smash-bacon-burger',
    name: 'Smash Bacon Cheeseburger',
    category: 'burger',
    description: 'Pur steak haché de bœuf smashé et caramélisé, double cheddar anglais fondant, bacon fumé croustillant et oignons confits dans son bun brioché toasté.',
    price: 2500,
    priceDisplay: '2 500 FCFA',
    image: '/assets/burger-gourmet.jpg',
    isNew: true,
    badge: '✨ Nouveauté du Chef',
    tags: ['Double Cheddar', 'Bacon croustillant', 'Bun brioché']
  },
  {
    id: 'chawarma-light-chic',
    name: 'Chawarma Light Gourmet & Avocat',
    category: 'chawarma',
    description: 'Une assiette fraîche et raffinée : aiguillettes de poulet fondant mariné, dés d’avocat crémeux, tomates cerises, salade croquante et sauce légère aux fines herbes.',
    price: 1500,
    priceDisplay: '1 500 FCFA',
    isPopular: true,
    badge: '⭐ Recette Signature',
    image: '/assets/chawarma-chic.jpg',
    tags: ['Gourmet', 'Avocat & Salade', 'Léger & Savoureux']
  },
  {
    id: 'poisson-alloco-chic',
    name: 'Poisson Braisé Délices & Alloco',
    category: 'attieke',
    description: 'Assiette restaurant élégante : poisson frais entier mariné et braisé au feu de bois, rondelles de citron vert, tomates fraîches, bananes plantains alloco dorées et sauce pimentée.',
    price: 3500,
    priceDisplay: '3 500 FCFA',
    isChefSpecial: true,
    badge: '👑 Spécialité Prestige',
    image: '/assets/poisson-alloco-chic.jpg',
    tags: ['Poisson braisé', 'Alloco doré', 'Dressage chic']
  },
  {
    id: 'poulet-braise-chic',
    name: 'Poulet Braisé Rôti au Four & Épices',
    category: 'grillade',
    description: 'Poulet fermier doré à la peau croustillante et chair ultra tendre, assaisonné aux épices africaines avec sa compotée de sauce tomate épicée.',
    price: 3000,
    priceDisplay: '3 000 FCFA',
    badge: '🍗 Grillade d’Exception',
    image: '/assets/chicken-gourmet-chic.jpg',
    tags: ['Fermier', 'Rôti à point', 'Sauce maison']
  }
];

export const ALL_MENU_ITEMS: MenuItem[] = [
  // Chawarmas
  {
    id: 'chawarma-crunch',
    name: 'Chawarma Crunch aux Frites Dorées',
    category: 'chawarma',
    description: 'Galette lavash dorée et croustillante, poulet mariné généreux, frites dorées et sauce onctueuse servie à l’assiette.',
    price: 2000,
    priceDisplay: '2 000 FCFA',
    image: '/assets/chawarma-plate-chic.jpg',
    isPopular: true,
    badge: 'Best-Seller',
    tags: ['Croustillant', 'Frites', 'Sauce blanche']
  },
  {
    id: 'chawarma-light-chic',
    name: 'Chawarma Light Gourmet & Avocat',
    category: 'chawarma',
    description: 'Aiguillettes de poulet fondant mariné, crudités croquantes, tranches d’avocat et sauce blanche légère dans une galette toastée avec bol de salade.',
    price: 1500,
    priceDisplay: '1 500 FCFA',
    image: '/assets/chawarma-chic.jpg',
    isPopular: true,
    tags: ['Poulet tendre', 'Avocat', 'Crudités fraîches']
  },
  {
    id: 'chawarma-broche',
    name: 'Chawarma Royal à la Broche',
    category: 'chawarma',
    description: 'Viande tranchée directement de la broche tournante, marinée 24h avec nos aromates, oignons rouges et double sauce au choix.',
    price: 2500,
    priceDisplay: '2 500 FCFA',
    image: '/assets/chawarma-gourmet.jpg',
    tags: ['Tranché minute', 'Broche braisée', 'Extra gourmand']
  },

  // Burgers Nouveautés
  {
    id: 'smash-bacon-burger',
    name: 'Bacon Cheeseburger Gourmand',
    category: 'burger',
    description: 'Pur bœuf de qualité, double cheddar anglais fondu, tranches de bacon grillé croustillant et oignons caramélisés.',
    price: 2500,
    priceDisplay: '2 500 FCFA',
    image: '/assets/burger-gourmet.jpg',
    isNew: true,
    badge: '🔥 Nouvelle Recette',
    tags: ['Bœuf 100%', 'Bacon croustillant', 'Cheddar']
  },
  {
    id: 'menu-burger-coke',
    name: 'Menu Burger Complet + Frites & Coca',
    category: 'burger',
    description: 'Le burger gourmand accompagné d’un panier de frites chaudes dorées et d’une bouteille de Coca-Cola servie glacée.',
    price: 3500,
    priceDisplay: '3 500 FCFA',
    image: '/assets/burger-menu.jpg',
    isNew: true,
    badge: '⭐ Formule Complète',
    tags: ['Menu complet', 'Frites chaudes', 'Coca glacé']
  },

  // Grillades & Poissons
  {
    id: 'poulet-braise-chic',
    name: 'Poulet Braisé Rôti au Chaudron & Épices',
    category: 'grillade',
    description: 'Poulet entier fermier rôti à point, peau croustillante parfumée aux épices du Bénin, servi avec sauce pimentée.',
    price: 3000,
    priceDisplay: '3 000 FCFA',
    image: '/assets/chicken-gourmet-chic.jpg',
    tags: ['Poulet fermier', 'Doré au four', 'Épices']
  },
  {
    id: 'grillades-platter-chic',
    name: 'Plateau Prestige de Grillades Braisées',
    category: 'grillade',
    description: 'Assortiment de brochettes de bœuf mariné, cuisses de poulet braisées, légumes grillés servis chauds sur réchaud.',
    price: 4500,
    priceDisplay: '4 500 FCFA',
    image: '/assets/bbq-platter-chic.jpg',
    isChefSpecial: true,
    badge: 'Pour Partager',
    tags: ['Brochettes', 'Réchaud braise', 'Mix viandes']
  },
  {
    id: 'poisson-alloco-chic',
    name: 'Poisson Frais Braisé & Alloco Doré',
    category: 'attieke',
    description: 'Poisson entier braisé au feu de bois, garni de rondelles de citron vert et de tomates, servi avec sa portion d’alloco fondant.',
    price: 3500,
    priceDisplay: '3 500 FCFA',
    image: '/assets/poisson-alloco-chic.jpg',
    isPopular: true,
    badge: 'Plat Signature',
    tags: ['Poisson entier', 'Alloco doré', 'Dressage chic']
  },
  {
    id: 'portion-alloco',
    name: 'Portion d’Alloco Doré Croustillant',
    category: 'attieke',
    description: 'Bananes plantains mûres frites à point, dorées à l’or et fondantes en bouche.',
    price: 1000,
    priceDisplay: '1 000 FCFA',
    image: '/assets/alloco.jpg',
    tags: ['Plantains mûrs', 'Frit à l’or', 'Accompagnement']
  },

  // Espace Boissons & Bar
  {
    id: 'smoothie-tropical',
    name: 'Smoothie Tropical Mangue & Ananas',
    category: 'boisson',
    description: 'Smoothie 100% fruits frais : mangues juteuses du Bénin, ananas d’Allada, banane et touche de lait de coco, mixé minute.',
    price: 1500,
    priceDisplay: '1 500 FCFA',
    image: '/assets/smoothie.jpg',
    isNew: true,
    badge: 'Mixé Minute',
    tags: ['Smoothie', 'Mangue', 'Ananas Allada', 'Frais']
  },
  {
    id: 'bissap-royal',
    name: 'Bissap Royal Glacé aux Agrumes & Menthe',
    category: 'boisson',
    description: 'Infusion artisanale de fleurs d’hibiscus rouge bio, feuilles de menthe sauvage, zeste d’orange et vanille. Servi ultra frais.',
    price: 1000,
    priceDisplay: '1 000 FCFA',
    image: '/assets/bissap-ruby.jpg',
    isPopular: true,
    badge: 'Fait Maison',
    tags: ['Bissap', 'Menthe', 'Infusion bio', 'Glacé']
  },
  {
    id: 'ananas-pur-jus',
    name: 'Pur Jus d’Ananas Pain de Sucre d’Allada',
    category: 'boisson',
    description: 'Pressé à froid avec les célèbres ananas doux d’Allada (Bénin), servi dans un grand verre givré avec son col de mousse naturelle.',
    price: 1000,
    priceDisplay: '1 000 FCFA',
    image: '/assets/ananas-juice.jpg',
    isPopular: true,
    badge: 'Terroir Bénin',
    tags: ['Ananas Allada', 'Pur jus', 'Givré', 'Sans sucre']
  },
  {
    id: 'sobebra-beninoise',
    name: 'La Béninoise SOBEBRA Glacée',
    category: 'boisson',
    description: 'La bière nationale emblématique du Bénin par la brasserie SOBEBRA. Blonde, maltée et servie frappée.',
    price: 1000,
    priceDisplay: '1 000 FCFA',
    image: '/assets/sobebra-beninoise.jpg',
    tags: ['SOBEBRA', 'La Béninoise', 'Bière nationale', 'Frappée']
  },
  {
    id: 'sobebra-beaufort',
    name: 'Beaufort Lager SOBEBRA Fraîche',
    category: 'boisson',
    description: 'Bière blonde premium de la SOBEBRA, légère avec sa belle mousse blanche servie en chope givrée.',
    price: 1200,
    priceDisplay: '1 200 FCFA',
    image: '/assets/beer-chilled.jpg',
    tags: ['SOBEBRA', 'Beaufort', 'Blonde', 'Chope givrée']
  },
  {
    id: 'vin-rouge-verre',
    name: 'Verre de Vin Rouge Sélection du Patron',
    category: 'boisson',
    description: 'Vin rouge structuré aux arômes de fruits noirs mûrs et d’épices, idéal pour accompagner vos chawarmas et grillades.',
    price: 1500,
    priceDisplay: '1 500 FCFA',
    image: '/assets/vin-rouge.jpg',
    tags: ['Vin', 'Rouge', 'Cave', 'Au verre']
  },
  {
    id: 'cocktail-fraicheur',
    name: 'Cocktail Fraîcheur Citron Vert & Menthe',
    category: 'boisson',
    description: 'Cocktail désaltérant avec glace pilée, jus de citron vert pressé minute et feuilles de menthe fraîche pilées.',
    price: 1500,
    priceDisplay: '1 500 FCFA',
    image: '/assets/cocktail-chic.jpg',
    isNew: true,
    tags: ['Cocktail', 'Citron vert', 'Menthe', 'Glace pilée']
  },
  {
    id: 'vin-bouteille',
    name: 'Bouteille de Vin Rouge Sélection (75cl)',
    category: 'boisson',
    description: 'Bouteille de vin rouge sélectionnée pour accompagner vos déjeuners et dîners conviviaux.',
    price: 6000,
    priceDisplay: '6 000 FCFA',
    image: '/assets/vin-rouge.jpg',
    tags: ['Vin 75cl', 'Bouteille', 'Prestige']
  }
];

export const BAR_DRINKS: MenuItem[] = ALL_MENU_ITEMS.filter(
  (item) => item.category === 'boisson'
);
