import { Box, HStack } from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";
import useCartQueryStore from "../store/cartStore";

const CartIcon = () => {
  const cartQuery = useCartQueryStore((s) => s.cartQuery);

  return (
    <HStack position={"relative"} spacing={1}>
      <BiCart size={26} />
      {cartQuery?.items?.length > 0 && (
        <Box
          position={"absolute"}
          top={-1}
          right={-2}
          m={0}
          p={0}
          boxSize={4}
          textAlign={"center"}
          alignContent={"center"}
          bg="red"
          color="white"
          borderRadius="full"
          fontSize={"0.8rem"}
        >
          {cartQuery.items.length}
        </Box>
      )}
    </HStack>
  );
};

export default CartIcon;
