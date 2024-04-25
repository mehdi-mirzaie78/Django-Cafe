import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";
import useCartQueryStore from "../store/cartStore";

const apiClient = new APIClient("/carts/");
const useCart = () => {
  const { cartQuery, setCartQuery } = useCartQueryStore();

  return useMutation<any, AxiosError>({
    mutationKey: ["AddToCart"],
    mutationFn: async () => {
      if (!cartQuery.id) return await apiClient.post({});
      return cartQuery;
    },
    onSuccess: (data: any) => {
      setCartQuery(data);
    },
  });
};

export default useCart;
