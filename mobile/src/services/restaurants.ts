import { MenuItem, Restaurant } from '../data/mock';
import { api } from './api';

// Tipos que a API retorna (snake_case)
interface RestaurantRow {
  id: string;
  name: string;
  categories: string[];
  rating: number;
  delivery_fee: string;
  delivery_time: string;
  distance: string;
  icon_name: string;
  icon_color: string;
  promoted: boolean;
  cover_image: string;
}

interface MenuItemRow {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  tab: 'popular' | 'mains' | 'drinks' | 'desserts';
  icon_name: string;
  image: string;
  rating: number | null;
}

// Mapeia resposta da API para o tipo do mobile
function mapRestaurant(row: RestaurantRow): Restaurant {
  return {
    id: row.id,
    name: row.name,
    categories: row.categories,
    rating: row.rating,
    deliveryFee: row.delivery_fee,
    deliveryTime: row.delivery_time,
    distance: row.distance,
    iconName: row.icon_name,
    iconColor: row.icon_color,
    promoted: row.promoted ?? false,
    coverImage: row.cover_image,
    heroImage: row.cover_image,
    followers: '—',
    productsCount: 0,
    menu: [],
  };
}

function mapMenuItem(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    tab: row.tab,
    iconName: row.icon_name,
    image: row.image,
    rating: row.rating ?? 4.5,
  };
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const { data } = await api.get<RestaurantRow[]>('/restaurants');
  return data.map(mapRestaurant);
}

export async function fetchRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
  const { data } = await api.get<MenuItemRow[]>(`/restaurants/${restaurantId}/menu`);
  return data.map(mapMenuItem);
}
