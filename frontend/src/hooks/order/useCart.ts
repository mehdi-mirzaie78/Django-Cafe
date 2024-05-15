import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cart from "../../entities/Cart";
import APIClient from "../../services/apiClient";
import useCartQueryStore, { CartQuery } from "../../store/cartStore";

const useCart = (cartId: string | undefined, shouldFetch: boolean = true) => {
  const { setCartQuery } = useCartQueryStore();
  const apiClient = new APIClient<Cart>(`/carts/${cartId}/`);

  const queryInfo = useQuery<Cart, AxiosError>({
    queryKey: ["cart", cartId],
    queryFn: async () => apiClient.get(),
    onSuccess: (data: Cart) => setCartQuery(data),
    onError: (error) => setCartQuery({} as CartQuery),
    enabled: shouldFetch && cartId !== undefined,
  });

  return {
    ...queryInfo,
    refetch: queryInfo.refetch,
  };
};

export default useCart;
