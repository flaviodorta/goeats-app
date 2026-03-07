export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tab: 'popular' | 'mains' | 'drinks' | 'desserts';
  iconName: string;
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

export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: 'food-variant' },
  { id: 'pizza', name: 'Pizza', icon: 'pizza' },
  { id: 'sushi', name: 'Sushi', icon: 'fish' },
  { id: 'burger', name: 'Burger', icon: 'hamburger' },
  { id: 'arabic', name: 'Árabe', icon: 'food' },
  { id: 'dessert', name: 'Doces', icon: 'cupcake' },
  { id: 'healthy', name: 'Fit', icon: 'leaf' },
];

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Com fome de pizza?',
    subtitle: 'Até 30% off em todas\nas italianas',
    cta: 'PEDIR AGORA',
    bgColor: '#E53935',
    iconName: 'pizza',
  },
  {
    id: '2',
    title: 'Sushi fresquinho',
    subtitle: 'Frete grátis nos\n3 primeiros pedidos',
    cta: 'APROVEITAR',
    bgColor: '#1976D2',
    iconName: 'fish',
  },
  {
    id: '3',
    title: 'Burger artesanal',
    subtitle: 'Monte do seu\njeito favorito',
    cta: 'MONTAR AGORA',
    bgColor: '#FF6F61',
    iconName: 'hamburger',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Pizza Hub',
    categories: ['Italiana', 'Pizza'],
    rating: 4.8,
    deliveryFee: 'R$ 2,99',
    deliveryTime: '20-30 min',
    distance: '1.2 km',
    iconName: 'pizza',
    iconColor: '#E53935',
    promoted: true,
    menu: [
      { id: '1-1', name: 'Truffle Mushroom Risotto', description: 'Arroz arbóreo cremoso com cogumelos selvagens e óleo de trufa.', price: 12.90, tab: 'popular', iconName: 'bowl-mix' },
      { id: '1-2', name: 'Classic Margherita Pizza', description: 'Mussarela de búfala fresca, tomates san marzano e manjericão.', price: 14.50, tab: 'popular', iconName: 'pizza' },
      { id: '1-3', name: 'Pesto Genovese Pasta', description: 'Linguine artesanal com pesto de manjericão e pinhões torrados.', price: 13.20, tab: 'popular', iconName: 'noodles' },
      { id: '1-4', name: 'Pepperoni Especial', description: 'Molho de tomate, mussarela e pepperoni importado.', price: 16.90, tab: 'mains', iconName: 'pizza' },
      { id: '1-5', name: 'Tiramisù', description: 'Sobremesa italiana clássica com mascarpone e café.', price: 8.50, tab: 'desserts', iconName: 'cake' },
      { id: '1-6', name: 'Suco de Limão', description: 'Suco natural gelado 500ml.', price: 6.00, tab: 'drinks', iconName: 'cup' },
    ],
  },
  {
    id: '2',
    name: 'Sushi Samurai',
    categories: ['Japonesa', 'Sushi'],
    rating: 4.6,
    deliveryFee: 'Grátis',
    deliveryTime: '35-50 min',
    distance: '2.8 km',
    iconName: 'fish',
    iconColor: '#1976D2',
    menu: [
      { id: '2-1', name: 'Combo Salmão 20 peças', description: 'Niguiri, uramaki e sashimi de salmão fresco.', price: 42.90, tab: 'popular', iconName: 'fish' },
      { id: '2-2', name: 'Hot Roll Especial', description: 'Camarão empanado, cream cheese e molho teriyaki.', price: 29.90, tab: 'popular', iconName: 'food' },
      { id: '2-3', name: 'Temaki Atum', description: 'Cone de alga com atum, pepino e cebolinha.', price: 18.50, tab: 'mains', iconName: 'food-variant' },
      { id: '2-4', name: 'Missoshiro', description: 'Sopa de missô tradicional com tofu e alga.', price: 7.00, tab: 'drinks', iconName: 'bowl-mix' },
      { id: '2-5', name: 'Mochi de Morango', description: 'Bolinho de arroz japonês recheado com sorvete.', price: 9.90, tab: 'desserts', iconName: 'cake-variant' },
    ],
  },
  {
    id: '3',
    name: 'Burger Bros',
    categories: ['Americana', 'Burger'],
    rating: 4.5,
    deliveryFee: 'R$ 4,99',
    deliveryTime: '25-40 min',
    distance: '0.9 km',
    iconName: 'hamburger',
    iconColor: '#FF6F61',
    menu: [
      { id: '3-1', name: 'Classic Smash Burger', description: 'Blend 160g, queijo cheddar, picles e molho especial.', price: 22.90, tab: 'popular', iconName: 'hamburger' },
      { id: '3-2', name: 'BBQ Bacon Burger', description: 'Blend 200g, bacon crocante, cebola caramelizada e BBQ.', price: 27.90, tab: 'popular', iconName: 'hamburger' },
      { id: '3-3', name: 'Batata Frita Temperada', description: 'Porção 200g com tempero especial da casa.', price: 12.00, tab: 'popular', iconName: 'food' },
      { id: '3-4', name: 'Chicken Crispy', description: 'Frango crocante, alface, tomate e maionese de ervas.', price: 19.90, tab: 'mains', iconName: 'food-drumstick' },
      { id: '3-5', name: 'Milk Shake Oreo', description: 'Sorvete de baunilha, leite e Oreo triturado 400ml.', price: 14.90, tab: 'drinks', iconName: 'cup' },
      { id: '3-6', name: 'Brownie com Sorvete', description: 'Brownie quente com sorvete de baunilha e calda.', price: 11.90, tab: 'desserts', iconName: 'cake' },
    ],
  },
  {
    id: '4',
    name: 'Green Bowl',
    categories: ['Saudável', 'Fit'],
    rating: 4.7,
    deliveryFee: 'R$ 1,99',
    deliveryTime: '15-25 min',
    distance: '0.5 km',
    iconName: 'leaf',
    iconColor: '#4CAF50',
    menu: [
      { id: '4-1', name: 'Açaí Bowl Tropical', description: 'Açaí com granola, banana, morango e mel orgânico.', price: 19.90, tab: 'popular', iconName: 'bowl-mix' },
      { id: '4-2', name: 'Buddha Bowl Vegano', description: 'Grão-de-bico, quinoa, legumes assados e tahine.', price: 24.90, tab: 'popular', iconName: 'leaf' },
      { id: '4-3', name: 'Wrap Integral Frango', description: 'Frango grelhado, alface, tomate e molho de iogurte.', price: 18.50, tab: 'mains', iconName: 'food-variant' },
      { id: '4-4', name: 'Smoothie Verde', description: 'Espinafre, banana, maçã e gengibre 350ml.', price: 12.90, tab: 'drinks', iconName: 'cup' },
      { id: '4-5', name: 'Pudim de Chia', description: 'Chia com leite de coco e calda de frutas vermelhas.', price: 9.90, tab: 'desserts', iconName: 'cake-variant' },
    ],
  },
];
