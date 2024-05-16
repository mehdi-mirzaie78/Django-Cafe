import { useQuery } from "@tanstack/react-query";
import Order from "../../entities/Order";
import PrivateAPIClient from "../../services/privateAPIClient";

const useCheckOrder = (orderId: number) => {
  const privateApiClient = new PrivateAPIClient<Order>(`/orders`);

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => privateApiClient.get(orderId),
  });
};

export default useCheckOrder;
