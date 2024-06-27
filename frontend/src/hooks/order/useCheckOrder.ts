import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Order from "../../entities/Order";
import PrivateAPIClient from "../../services/privateAPIClient";

const useCheckOrder = (orderId: number) => {
  const privateApiClient = new PrivateAPIClient<Order>(
    `/orders/${orderId}/payment/`
  );

  return useQuery<Order, AxiosError>({
    queryKey: ["order", orderId],
    queryFn: () => privateApiClient.get(),
    retry: 0,
  });
};

export default useCheckOrder;
