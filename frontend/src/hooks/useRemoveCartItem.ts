import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import useCartQueryStore from "../store/cartStore";

const useDeleteCartItem = () => {
  const { cartQuery, setCartQuery } = useCartQueryStore();
  const apiClient = new APIClient(`/carts/${cartQuery.id}/items`);

  return useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: async (id: number) => apiClient.delete(id),
    onSuccess: (data, variables) => {
      setCartQuery({
        ...cartQuery,
        items: cartQuery.items.filter((item) => item.id !== variables),
      });
    },
  });
};

export default useDeleteCartItem;
