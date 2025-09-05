"use client";
import { create } from "zustand";

type CartState = {
  cartCount: number;
  addToCart: (quantity?: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  addToCart: (quantity = 1) =>
    set((state) => ({ cartCount: state.cartCount + quantity })),
}));
