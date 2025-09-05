// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);

        if (existing) {
          // if already in cart → increase quantity
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          // if new item → just add
          set({ items: [...get().items, item] });
        }
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" } // saves to localStorage
  )
);
