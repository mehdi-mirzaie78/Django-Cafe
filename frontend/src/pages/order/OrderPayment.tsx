import { Button, Divider, HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import OrderPreview from "../../components/OrderPreview";
import useCheckOrder from "../../hooks/order/useCheckOrder";
import usePayOrder from "../../hooks/order/usePayOrder";
import useAuthQueryStore from "../../store/authStore";
import usePaymentQueryStore from "../../store/paymentStore";

const OrderPayment = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthQueryStore((s) => s.authQuery);
  const { orderId } = usePaymentQueryStore((s) => s.paymentQuery);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else if (!orderId || orderId === 0) {
      navigate("/checkout/cart");
    }
  }, []);
  const { data: order, isLoading, error } = useCheckOrder(orderId);
  const { mutate: payOrder } = usePayOrder(orderId);

  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <VStack w={"90%"} mx={"auto"}>
      <OrderPreview order={order} />

      <Divider w={"90%"} my={5} />

      <HStack spacing={4} my={5} justifyContent={"center"} w="90%">
        <Button
          w="20%"
          colorScheme="red"
          onClick={() => console.log("Canceled")}
        >
          Cancel
        </Button>
        <Button
          w="20%"
          colorScheme="green"
          onClick={() =>
            payOrder({ paymentStatus: true, transactionCode: "10000" })
          }
        >
          Pay
        </Button>
      </HStack>
    </VStack>
  );
};

export default OrderPayment;
