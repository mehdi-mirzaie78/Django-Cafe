import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import useCartQueryStore from "../../store/cartStore";

const useDeleteCartItem = () => {
  const { cartQuery, setCartQuery } = useCartQueryStore();
  const apiClient = new APIClient(`/carts/${cartQuery.id}/items`);

  return useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: async (id: number) => apiClient.delete(id),
    onSuccess: (data, variables) => {
      const items = cartQuery.items.filter((item) => item.id !== variables);
      const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);
      setCartQuery({
        ...cartQuery,
        items: items,
        totalPrice: totalPrice,
      });
    },
  });
};

export default useDeleteCartItem;
