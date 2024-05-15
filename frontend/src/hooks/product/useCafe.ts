import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import cafe from "../../data/cafe";
import Cafe from "../../entities/Cafe";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<Cafe>("/cafe/");

const useCafe = () => {
  return useQuery({
    queryKey: ["cafe"],
    queryFn: () => apiClient.get(),
    staleTime: ms("24h"),
    // initialData: cafe,
    // TODO: CHECK THE EXPIRATION TIME OF LINKS
  });
};

export default useCafe;
