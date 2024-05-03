import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import ms from "ms";

interface OrderTypes {
  [key: string]: string;
}

const apiClient = new APIClient<OrderTypes>("/order-types/");
const useOrderTypes = () =>
  useQuery({
    queryKey: ["orderTypes"],
    queryFn: () => apiClient.get(),
    staleTime: ms("24h"),
  });

export default useOrderTypes;
