import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import Order from "../../entities/Order";
import { FetchResponse } from "../../services/apiClient";
import PrivateAPIClient from "../../services/privateAPIClient";

const useOrders = () => {
  const navigate = useNavigate();
  const privateApiClient = new PrivateAPIClient<Order>("/orders/");

  return useQuery<FetchResponse<Order>, AxiosError>({
    queryKey: ["orders"],
    queryFn: () => privateApiClient.getAll(),
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
