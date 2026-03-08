export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tab: 'popular' | 'mains' | 'drinks' | 'desserts';
  iconName: string;
  image: string;
  rating?: number;
};

export type Restaurant = {
  id: string;
  name: string;
  categories: string[];
  rating: number;
  deliveryFee: string;
  deliveryTime: string;
  distance: string;
  iconName: string;
  iconColor: string;
  coverImage: string;
  heroImage: string;
  followers: string;
  productsCount: number;
  promoted?: boolean;
  menu: MenuItem[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  bgColor: string;
  iconName: string;
};

const img = {
  burgerHero:
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
  burgerAlt:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  pizzaHero:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  sushiHero:
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
  healthyHero:
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
  friedChicken:
    'https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=900&q=80',
  fries:
    'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80',
  cake:
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
  pasta:
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
  risotto:
    'https://images.unsplash.com/photo-1633436375153-d7045cb93e38?auto=format&fit=crop&w=900&q=80',
  pizzaMargherita:
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80',
  pepperoni:
    'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80',
  tiramisu:
    'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
  lemonade:
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
  sushiCombo:
    'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80',
  hotRoll:
    'https://images.unsplash.com/photo-1617196035154-1e0f29c8f2ef?auto=format&fit=crop&w=900&q=80',
  temaki:
    'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80',
  miso:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  mochi:
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
  smash:
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  bbq:
    'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=80',
  chicken:
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80',
  milkshake:
    'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=900&q=80',
  brownie:
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
  acai:
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
  bowl:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  wrap:
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
  smoothie:
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80',
  chia:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
};

export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: 'silverware-fork-knife' },
  { id: 'burger', name: 'Hambúrguer', icon: 'hamburger' },
  { id: 'sushi', name: 'Frutos', icon: 'shrimp' },
  { id: 'dessert', name: 'Doces', icon: 'cake-variant' },
  { id: 'steak', name: 'Carnes', icon: 'food-steak' },
  { id: 'pizza', name: 'Pizza', icon: 'pizza' },
  { id: 'healthy', name: 'Salada', icon: 'leaf' },
];

export const banners: Banner[] = [
  {
    id: '1',
    title: '27% OFF EXTRA',
    subtitle: 'Enjoy your first order\nwith a special discount!',
    cta: 'PEDIR AGORA',
    bgColor: '#2A241F',
    iconName: 'brightness-percent',
  },
  {
    id: '2',
    title: 'Semana do Hambúrguer',
    subtitle: 'Best sellers with\nfree delivery tonight',
    cta: 'VER OFERTAS',
    bgColor: '#BE3C13',
    iconName: 'hamburger',
  },
  {
    id: '3',
    title: 'Sexta do Sushi',
    subtitle: 'Get 2 rolls and\npay only one',
    cta: 'APROVEITAR',
    bgColor: '#172027',
    iconName: 'fish',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: "BkBite's Hub",
    categories: ['Hambúrguer', 'Frango', 'Combos'],
    rating: 4.8,
    deliveryFee: 'R$ 3,55',
    deliveryTime: '10-20 min',
    distance: '3.7 km',
    iconName: 'hamburger',
    iconColor: '#DA4E1C',
    coverImage: img.burgerHero,
    heroImage: img.burgerAlt,
    followers: '234K',
    productsCount: 5467,
    promoted: true,
    menu: [
      {
        id: '1-1',
        name: 'Fried Chicken',
        description: 'Coxa e sobrecoxa crocantes com molho da casa.',
        price: 4.0,
        tab: 'popular',
        iconName: 'food-drumstick',
        image: img.friedChicken,
        rating: 4.9,
      },
      {
        id: '1-2',
        name: 'Big Mac Burger',
        description: 'Duplo blend, cheddar, picles e molho especial.',
        price: 3.0,
        tab: 'popular',
        iconName: 'hamburger',
        image: img.smash,
        rating: 4.9,
      },
      {
        id: '1-3',
        name: 'BBQ Bacon Burger',
        description: 'Burger com bacon crispy e cebola caramelizada.',
        price: 3.5,
        tab: 'mains',
        iconName: 'hamburger',
        image: img.bbq,
        rating: 4.8,
      },
      {
        id: '1-4',
        name: 'Loaded Fries',
        description: 'Batata canoa com cheddar, bacon e cebolinha.',
        price: 2.5,
        tab: 'mains',
        iconName: 'food',
        image: img.fries,
        rating: 4.7,
      },
      {
        id: '1-5',
        name: 'Choco Milkshake',
        description: 'Milkshake cremoso de chocolate 400ml.',
        price: 2.2,
        tab: 'drinks',
        iconName: 'cup',
        image: img.milkshake,
        rating: 4.8,
      },
      {
        id: '1-6',
        name: 'Brownie Lava',
        description: 'Brownie quente com calda de chocolate.',
        price: 2.0,
        tab: 'desserts',
        iconName: 'cake',
        image: img.brownie,
        rating: 4.9,
      },
    ],
  },
  {
    id: '2',
    name: 'The Pizza Hub',
    categories: ['Italiana', 'Pizza'],
    rating: 4.8,
    deliveryFee: 'R$ 2,99',
    deliveryTime: '20-30 min',
    distance: '1.2 km',
    iconName: 'pizza',
    iconColor: '#D33F18',
    coverImage: img.pizzaHero,
    heroImage: img.pizzaHero,
    followers: '142K',
    productsCount: 1204,
    menu: [
      {
        id: '2-1',
        name: 'Truffle Risotto',
        description: 'Arroz arboreo cremoso com cogumelos selvagens.',
        price: 12.9,
        tab: 'popular',
        iconName: 'bowl-mix',
        image: img.risotto,
        rating: 4.7,
      },
      {
        id: '2-2',
        name: 'Classic Margherita',
        description: 'Molho san marzano, mozzarella e manjericao.',
        price: 14.5,
        tab: 'popular',
        iconName: 'pizza',
        image: img.pizzaMargherita,
        rating: 4.9,
      },
      {
        id: '2-3',
        name: 'Pesto Pasta',
        description: 'Linguine artesanal com pesto e pinoli.',
        price: 13.2,
        tab: 'mains',
        iconName: 'noodles',
        image: img.pasta,
        rating: 4.8,
      },
      {
        id: '2-4',
        name: 'Pepperoni Special',
        description: 'Pizza premium com pepperoni importado.',
        price: 16.9,
        tab: 'mains',
        iconName: 'pizza',
        image: img.pepperoni,
        rating: 4.8,
      },
      {
        id: '2-5',
        name: 'Sicilian Lemonade',
        description: 'Limonada gelada artesanal 500ml.',
        price: 6,
        tab: 'drinks',
        iconName: 'cup',
        image: img.lemonade,
        rating: 4.5,
      },
      {
        id: '2-6',
        name: 'Tiramisu',
        description: 'Sobremesa italiana com mascarpone e cafe.',
        price: 8.5,
        tab: 'desserts',
        iconName: 'cake-variant',
        image: img.tiramisu,
        rating: 4.9,
      },
    ],
  },
  {
    id: '3',
    name: 'Sushi Samurai',
    categories: ['Japonesa', 'Sushi'],
    rating: 4.6,
    deliveryFee: 'Grátis',
    deliveryTime: '35-50 min',
    distance: '2.8 km',
    iconName: 'fish',
    iconColor: '#2567AF',
    coverImage: img.sushiHero,
    heroImage: img.sushiHero,
    followers: '98K',
    productsCount: 824,
    menu: [
      {
        id: '3-1',
        name: 'Combo Salmon 20pc',
        description: 'Nigiri, uramaki e sashimi de salmao fresco.',
        price: 42.9,
        tab: 'popular',
        iconName: 'fish',
        image: img.sushiCombo,
        rating: 4.8,
      },
      {
        id: '3-2',
        name: 'Hot Roll Special',
        description: 'Camarao empanado, cream cheese e teriyaki.',
        price: 29.9,
        tab: 'mains',
        iconName: 'food',
        image: img.hotRoll,
        rating: 4.7,
      },
      {
        id: '3-3',
        name: 'Temaki Tuna',
        description: 'Cone de alga com atum, pepino e cebolinha.',
        price: 18.5,
        tab: 'mains',
        iconName: 'food-variant',
        image: img.temaki,
        rating: 4.7,
      },
      {
        id: '3-4',
        name: 'Miso Soup',
        description: 'Sopa de miso tradicional com tofu e alga.',
        price: 7,
        tab: 'drinks',
        iconName: 'bowl-mix',
        image: img.miso,
        rating: 4.5,
      },
      {
        id: '3-5',
        name: 'Mochi Strawberry',
        description: 'Mochi macio recheado com creme de morango.',
        price: 9.9,
        tab: 'desserts',
        iconName: 'cake',
        image: img.mochi,
        rating: 4.8,
      },
    ],
  },
  {
    id: '4',
    name: 'Green Bowl',
    categories: ['Saudavel', 'Saladas'],
    rating: 4.7,
    deliveryFee: 'R$ 1,99',
    deliveryTime: '15-25 min',
    distance: '0.5 km',
    iconName: 'leaf',
    iconColor: '#2D8A59',
    coverImage: img.healthyHero,
    heroImage: img.healthyHero,
    followers: '76K',
    productsCount: 512,
    menu: [
      {
        id: '4-1',
        name: 'Acai Tropical',
        description: 'Acai com frutas e granola artesanal.',
        price: 19.9,
        tab: 'popular',
        iconName: 'bowl-mix',
        image: img.acai,
        rating: 4.8,
      },
      {
        id: '4-2',
        name: 'Buddha Bowl',
        description: 'Quinoa, grao-de-bico e legumes assados.',
        price: 24.9,
        tab: 'mains',
        iconName: 'leaf',
        image: img.bowl,
        rating: 4.7,
      },
      {
        id: '4-3',
        name: 'Integral Wrap',
        description: 'Frango grelhado, folhas e molho de iogurte.',
        price: 18.5,
        tab: 'mains',
        iconName: 'food-variant',
        image: img.wrap,
        rating: 4.6,
      },
      {
        id: '4-4',
        name: 'Green Smoothie',
        description: 'Espinafre, maca e banana 350ml.',
        price: 12.9,
        tab: 'drinks',
        iconName: 'cup',
        image: img.smoothie,
        rating: 4.7,
      },
      {
        id: '4-5',
        name: 'Chia Pudding',
        description: 'Leite de coco, chia e frutas vermelhas.',
        price: 9.9,
        tab: 'desserts',
        iconName: 'cake-variant',
        image: img.chia,
        rating: 4.8,
      },
    ],
  },
];
