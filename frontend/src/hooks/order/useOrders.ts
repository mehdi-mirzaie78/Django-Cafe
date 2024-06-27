import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Order from "../../entities/Order";
import { FetchResponse } from "../../services/apiClient";
import PrivateAPIClient from "../../services/privateAPIClient";

const useOrders = ({ pageParam = 1 }) => {
  const navigate = useNavigate();
  const privateApiClient = new PrivateAPIClient<Order>("/orders/");

  return useQuery<FetchResponse<Order>, AxiosError>({
    queryKey: ["orders", pageParam],
    queryFn: () => privateApiClient.getAll({ params: { page: pageParam } }),
    onError: (err) => {
      if (
        err.response?.status === 401 ||
        err.response?.status === 403 ||
        err.response?.status === 400
      ) {
        navigate("/login?redirect=/profile/orders");
      }
    },
    retry: 1,
  });
};

export default useOrders;
