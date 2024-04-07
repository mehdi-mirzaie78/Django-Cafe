import Product from "../entities/Product";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<Product>("/products/");

const useProducts = () => {
  const config = {};
  return apiClient.getAll(config);
};

export default useProducts;
