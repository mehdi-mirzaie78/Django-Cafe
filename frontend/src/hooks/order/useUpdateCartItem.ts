import { useMutation } from "@tanstack/react-query";
import Cart, { CartItem } from "../../entities/Cart";
import APIClient from "../../services/apiClient";
import useCartQueryStore from "../../store/cartStore";
import { AxiosError } from "axios";

interface CartItemInput {
  itemId: number;
  quantity: number;
}

const useUpdateCartItem = () => {
  const { cartQuery, setCartQuery } = useCartQueryStore();
  const apiClient = new APIClient<CartItem>(`/carts/${cartQuery.id}/items`);

  return useMutation<any, AxiosError, CartItemInput>({
    mutationKey: ["updateCartItem"],
    mutationFn: async (data: CartItemInput) =>
      apiClient.patch(data.itemId, { quantity: data.quantity }),
    onSuccess: (data) => {
      const apiClient = new APIClient<Cart>(`/carts/${cartQuery.id}/`);
      apiClient.get().then((data) => setCartQuery(data));
    },
  });
};

export default useUpdateCartItem;
