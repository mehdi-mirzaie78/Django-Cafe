import { useQuery } from "@tanstack/react-query";
import products from "../data/products";
import Product from "../entities/Product";
import APIClient from "../services/apiClient";
import useProductQueryStore from "../store";
const apiClient = new APIClient<Product>("/products/");

const useProducts = () => {
  const { productQuery } = useProductQueryStore();

  return useQuery({
    queryKey: ["products", productQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          search: productQuery.searchText,
          ordering: productQuery.ordering,
          categories: productQuery.categoryId,
        },
      }),
    initialData: products,
  });
};

export default useProducts;
