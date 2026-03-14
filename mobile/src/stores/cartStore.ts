import { create } from 'zustand';
import { MenuItem, Restaurant } from '../data/mock';

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartStore = {
  restaurant: Restaurant | null;
  items: Record<string, CartItem>;
  pendingCheckout: boolean;
  addItem: (restaurant: Restaurant, item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  setPendingCheckout: (value: boolean) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  restaurant: null,
  items: {},
  pendingCheckout: false,

  addItem: (restaurant, item) => {
    const { restaurant: current } = get();

    // se adicionar item de outro restaurante, limpa o carrinho
    if (current && current.id !== restaurant.id) {
      set({
        restaurant,
        items: { [item.id]: { item, quantity: 1 } },
      });
      return;
    }

    set((state) => ({
      restaurant,
      items: {
        ...state.items,
        [item.id]: {
          item,
          quantity: (state.items[item.id]?.quantity ?? 0) + 1,
        },
      },
    }));
  },

  removeItem: (itemId) => {
    set((state) => {
      const current = state.items[itemId]?.quantity ?? 0;
      if (current <= 1) {
        const { [itemId]: _, ...rest } = state.items;
        return { items: rest, restaurant: Object.keys(rest).length === 0 ? null : state.restaurant };
      }
      return {
        items: {
          ...state.items,
          [itemId]: { ...state.items[itemId], quantity: current - 1 },
        },
      };
    });
  },

  clearCart: () => set({ restaurant: null, items: {}, pendingCheckout: false }),

  setPendingCheckout: (value) => set({ pendingCheckout: value }),

  totalItems: () =>
    Object.values(get().items).reduce((sum, c) => sum + c.quantity, 0),

  totalPrice: () =>
    Object.values(get().items).reduce(
      (sum, c) => sum + c.item.price * c.quantity,
      0
    ),
}));
