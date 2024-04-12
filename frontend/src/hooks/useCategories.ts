import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Category from "../entities/Category";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<Category>("/categories/");

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });

export default useCategories;
