import { useMutation } from "@tanstack/react-query";
import Cart, { CartItem } from "../../entities/Cart";
import APIClient from "../../services/apiClient";
import useCartQueryStore from "../../store/cartStore";
import useCart from "./useCart";

const useAddToCart = () => {
  const { cartQuery, setCartQuery } = useCartQueryStore();
  const apiClient = new APIClient<CartItem>(`/carts/${cartQuery.id}/items/`);
  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async (productId: number) =>
      apiClient.post({ productId, quantity: 1 }),
    onSuccess: (data) => {
      const apiClient = new APIClient<Cart>(`/carts/${cartQuery.id}/`);
      apiClient.get().then((data) => setCartQuery(data));
    },
  });
};

export default useAddToCart;
