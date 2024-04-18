import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Cafe from "../entities/Cafe";
import { axiosInstance } from "../services/apiClient";

const useCafe = () => {
  return useQuery({
    queryKey: ["cafe"],
    queryFn: () => axiosInstance.get<Cafe>("/cafe/"),
    staleTime: ms("24h"),
  });
};

export default useCafe;
