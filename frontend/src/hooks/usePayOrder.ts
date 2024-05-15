import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import PrivateAPIClient from "../services/privateAPIClient";
import usePaymentQueryStore from "../store/paymentStore";

export interface PaymentResult {
  paymentStatus: boolean;
  transactionCode: string;
}

const usePayOrder = (orderId: number) => {
  const navigate = useNavigate();
  const privateApiClient = new PrivateAPIClient(`orders/${orderId}/payment/`);
  const resetPaymentQuery = usePaymentQueryStore((s) => s.resetPaymentQuery);

  return useMutation<any, AxiosError, PaymentResult>({
    mutationKey: ["payOrder"],
    mutationFn: (paymentResult: PaymentResult) =>
      privateApiClient.patch(paymentResult),
    onSuccess: () => {
      resetPaymentQuery();
      navigate("/checkout/success");
    },
  });
};

export default usePayOrder;
