import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import Order from "../../entities/Order";
import { FetchResponse } from "../../services/apiClient";
import PrivateAPIClient from "../../services/privateAPIClient";

const useOrders = () => {
  const privateApiClient = new PrivateAPIClient<Order>("/orders/");

  return useQuery<FetchResponse<Order>, AxiosError>({
    queryKey: ["orders"],
    queryFn: () => privateApiClient.getAll(),
    staleTime: ms("6h"),
  });
};

export default useOrders;
