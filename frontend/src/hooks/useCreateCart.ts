import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/apiClient";
import useCartQueryStore from "../store/cartStore";
import Cart from "../entities/Cart";

const apiClient = new APIClient<Cart>("/carts/");
const useCreateCart = () => {
  const { cartQuery, setCartQuery } = useCartQueryStore();

  return useMutation<any, AxiosError>({
    mutationKey: ["createCart"],
    mutationFn: async () => {
      if (!cartQuery.id) return await apiClient.post({});
      return cartQuery;
    },
    onSuccess: (data: Cart) => {
      setCartQuery(data);
    },
  });
};

export default useCreateCart;
