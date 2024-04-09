import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Category from "../entities/Category";

const apiClient = new APIClient<Category>("/categories/");

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getAll(),
  });

export default useCategories;
