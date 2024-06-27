import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";
import useAuthQueryStore from "../../store/authStore";

const OrderPaymentSuccess = () => {
  const { accessToken } = useAuthQueryStore((s) => s.authQuery);
  if (!accessToken) {
    return <div>Not Authorized</div>;
  }
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Your order has been paid successfully
      </Heading>
      <Text color={"gray.500"}>
        You can see your order's details in the profile page
      </Text>
    </Box>
  );
};

export default OrderPaymentSuccess;
