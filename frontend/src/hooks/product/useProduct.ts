import { useQuery } from "@tanstack/react-query";
import Product from "../../entities/Product";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<Product>("/products");

const useProduct = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useProduct;
