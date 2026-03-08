import { create } from 'zustand';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes?: number;
};

type OrderStore = {
  activeOrder: Order | null;
  history: Order[];
  setActiveOrder: (order: Order) => void;
  updateActiveStatus: (status: OrderStatus) => void;
  clearActiveOrder: () => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  activeOrder: null,
  history: [],

  setActiveOrder: (order) => set({ activeOrder: order }),

  updateActiveStatus: (status) => {
    const { activeOrder } = get();
    if (!activeOrder) return;

    const updated = { ...activeOrder, status };

    if (status === 'delivered' || status === 'cancelled') {
      set((state) => ({
        activeOrder: null,
        history: [updated, ...state.history],
      }));
      return;
    }

    set({ activeOrder: updated });
  },

  clearActiveOrder: () => set({ activeOrder: null }),
}));
