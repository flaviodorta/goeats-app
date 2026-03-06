export type Restaurant = {
  id: string;
  name: string;
  categories: string[];
  rating: number;
  deliveryFee: string;
  deliveryTime: string;
  iconName: string;
  iconColor: string;
  promoted?: boolean;
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
    iconName: 'pizza',
    iconColor: '#E53935',
    promoted: true,
  },
  {
    id: '2',
    name: 'Sushi Samurai',
    categories: ['Japonesa', 'Sushi'],
    rating: 4.6,
    deliveryFee: 'Grátis',
    deliveryTime: '35-50 min',
    iconName: 'fish',
    iconColor: '#1976D2',
  },
  {
    id: '3',
    name: 'Burger Bros',
    categories: ['Americana', 'Burger'],
    rating: 4.5,
    deliveryFee: 'R$ 4,99',
    deliveryTime: '25-40 min',
    iconName: 'hamburger',
    iconColor: '#FF6F61',
  },
  {
    id: '4',
    name: 'Green Bowl',
    categories: ['Saudável', 'Fit'],
    rating: 4.7,
    deliveryFee: 'R$ 1,99',
    deliveryTime: '15-25 min',
    iconName: 'leaf',
    iconColor: '#4CAF50',
  },
];
