import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const { data, isLoading, error } = useCheckOrder(orderId);
  const { mutate: payOrder } = usePayOrder(orderId);

  return (
    <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
      <Heading as="h2" size="xl" marginY={5}>
        Order Payment
      </Heading>
      <Text color={"gray.500"} marginBottom={5}>
        This page is not implemented yet
      </Text>
      <Button
        colorScheme="green"
        width={"25%"}
        onClick={() =>
          payOrder({ paymentStatus: true, transactionCode: "10000" })
        }
      >
        Pay
      </Button>
    </Box>
  );
};

export default OrderPayment;
