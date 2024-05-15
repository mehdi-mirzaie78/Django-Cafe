import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import OrderTypes from "../../entities/OrderTypes";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<OrderTypes>("/order-types/");
const useOrderTypes = () =>
  useQuery({
    queryKey: ["orderTypes"],
    queryFn: () => apiClient.get(),
    staleTime: ms("24h"),
  });

export default useOrderTypes;
