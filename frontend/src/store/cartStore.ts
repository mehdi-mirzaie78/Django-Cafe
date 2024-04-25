import { create } from "zustand";

interface CartQuery {
  id: string;
}

interface CartQueryStore {
  cartQuery: CartQuery;
  setCartQuery: (cartQuery: CartQuery) => void;
}

const useCartQueryStore = create<CartQueryStore>((set) => ({
  cartQuery: JSON.parse(localStorage.getItem("cart") || "{}"),
  setCartQuery: (cartQuery: CartQuery) =>
    set((store) => {
      store.cartQuery = cartQuery;
      localStorage.setItem("cart", JSON.stringify(store.cartQuery));
      return { cartQuery: store.cartQuery };
    }),
}));

export default useCartQueryStore;
