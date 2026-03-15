import { useAuthStore } from '../stores/authStore';
import { api } from './api';

export interface OrderItem {
  id: number;
  menu_item_id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderStatusEntry {
  id: number;
  status: string;
  actor: string;
  note: string | null;
  created_at: string;
}

export interface Order {
  id: number;
  restaurant_id: number;
  current_status: string;
  payment_method: string;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  address_street: string;
  address_number: string;
  address_complement: string | null;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zip_code: string;
  created_at: string;
  items: OrderItem[];
  history: OrderStatusEntry[];
  restaurant: { id: number; name: string; icon_name: string; icon_color: string };
}

export interface CreateOrderPayload {
  restaurant_id: number;
  payment_method: 'credit' | 'debit' | 'pix' | 'cash';
  coupon_code?: string;
  delivery_fee: number;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
  items: { menu_item_id: number; quantity: number }[];
}

const authHeaders = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const { data } = await api.post<Order>('/orders', payload, {
    headers: authHeaders(),
  });
  return data;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const { data } = await api.get<Order[]>('/orders', {
    headers: authHeaders(),
  });
  return data;
};

export const fetchOrder = async (id: number): Promise<Order> => {
  const { data } = await api.get<Order>(`/orders/${id}`, {
    headers: authHeaders(),
  });
  return data;
};
