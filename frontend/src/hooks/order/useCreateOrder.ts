import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import PrivateAPIClient from "../../services/privateAPIClient";
import useCartQueryStore from "../../store/cartStore";
import usePaymentQueryStore from "../../store/paymentStore";

export interface CreatOrder {
  cartId: string;
  orderType: string;
  tableId?: number;
  addressId?: number;
  phone?: string;
}

const useCreateOrder = () => {
  const navigate = useNavigate();
  const resetCartQuery = useCartQueryStore((s) => s.resetCartQuery);
  const setPaymentQuery = usePaymentQueryStore((s) => s.setPaymentQuery);
  const privateApiClient = new PrivateAPIClient("/orders/");

  return useMutation<any, AxiosError, CreatOrder>({
    mutationKey: ["createOrder"],
    mutationFn: (order: CreatOrder) => privateApiClient.post(order),
    onSuccess: (data) => {
      setPaymentQuery({ orderId: data.id });
      resetCartQuery();
      navigate("/checkout/payment");
    },
  });
};

export default useCreateOrder;
