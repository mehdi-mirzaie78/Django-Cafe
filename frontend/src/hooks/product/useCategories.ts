import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import Category from "../../entities/Category";
import APIClient, { FetchResponse } from "../../services/apiClient";

const apiClient = new APIClient<Category>("/categories/");

const useCategories = () =>
  useQuery<FetchResponse<Category>, AxiosError>({
    queryKey: ["categories"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });

export default useCategories;
