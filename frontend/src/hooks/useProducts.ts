import { useInfiniteQuery } from "@tanstack/react-query";
import Product from "../entities/Product";
import APIClient, { FetchResponse } from "../services/apiClient";
import { useProductQueryStore } from "../store";
import { AxiosError } from "axios";
import ms from "ms";

const apiClient = new APIClient<Product>("/products/");

const useProducts = () => {
  const { productQuery } = useProductQueryStore();

  return useInfiniteQuery<FetchResponse<Product>, AxiosError>({
    queryKey: ["products", productQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          search: productQuery.searchText,
          ordering: productQuery.ordering,
          categories: productQuery.categoryId,
          page: pageParam,
        },
      }),
    staleTime: ms("24h"),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

export default useProducts;
