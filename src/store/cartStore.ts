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
  // New features added below
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItems: () => number;
  getItemQuantity: (id: string) => number;
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

      // New features added below (keeping your existing code intact)
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          // If quantity is 0 or less, remove the item
          set({ items: get().items.filter((i) => i.id !== id) });
        } else {
          // Update the quantity
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          });
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemQuantity: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.quantity : 0;
      },
    }),
    { name: "cart-storage" } // saves to localStorage
  )
);