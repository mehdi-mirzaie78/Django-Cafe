import { create } from "zustand";
import { CartItem } from "../entities/Cart";

export interface CartQuery {
  id: string;
  items: CartItem[];
  totalPrice: number;
}

interface CartQueryStore {
  cartQuery: CartQuery;
  setCartQuery: (cartQuery: CartQuery) => void;
  resetCartQuery: () => void;
}

const useCartQueryStore = create<CartQueryStore>((set) => ({
  cartQuery: JSON.parse(localStorage.getItem("cart") || "{}"),
  setCartQuery: (cartQuery: CartQuery) =>
    set((store) => {
      store.cartQuery = cartQuery;
      localStorage.setItem("cart", JSON.stringify(store.cartQuery));
      return { cartQuery: store.cartQuery };
    }),
  resetCartQuery: () =>
    set((store) => {
      store.cartQuery = { id: "", items: [], totalPrice: 0 };
      localStorage.removeItem("cart");
      return { cartQuery: store.cartQuery };
    }),
}));

export default useCartQueryStore;
