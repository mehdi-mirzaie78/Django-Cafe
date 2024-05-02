import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import ErrorMessage from "../components/ErrorMessage";
import IncDecCartItem from "../components/IncDecCartItem";
import useCart from "../hooks/useCart";
import useCreateCart from "../hooks/useCreateCart";
import useRemoveCartItem from "../hooks/useRemoveCartItem";
import useUpdateCartItem from "../hooks/useUpdateCartItem";
import useCartQueryStore from "../store/cartStore";

const CartPage = () => {
  const cartQuery = useCartQueryStore((s) => s.cartQuery);
  const { mutate: updateCartItem, error: updateError } = useUpdateCartItem();

  const { mutate: createCart, isLoading: isCreatingCart } = useCreateCart();
  const { data: cartData, refetch: refetchCart } = useCart(
    cartQuery.id,
    !isCreatingCart
  );

  useEffect(() => {
    if (!cartQuery.id && !isCreatingCart) {
      createCart();
    } else if (!cartData) {
      refetchCart();
    }
  }, [cartQuery, createCart, refetchCart, cartData]);

  const { mutate: removeCartItem } = useRemoveCartItem();

  if (cartQuery?.items?.length === 0) {
    return (
      <Center>
        <Text fontSize={"x-large"} fontWeight={"bold"}>
          Your cart is empty
        </Text>
      </Center>
    );
  }

  return (
    <Box maxW={"100vw"}>
      {updateError && <ErrorMessage error={updateError} paddingX={5} />}
      <Grid
        templateAreas={{ base: "'side' 'main'", lg: "'main side'" }}
        templateColumns={{ base: "100%", lg: "2fr 1fr" }}
        gap={{ base: 5, md: 10 }}
        padding={{ base: 1, md: 5 }}
        maxWidth="100%"
        overflowX="auto"
      >
        <GridItem gridArea="main">
          <TableContainer
            paddingTop={1}
            shadow="md"
            borderWidth="1px"
            borderRadius={5}
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Table
              className="cart-table"
              variant="striped"
              size={{ base: "sm", md: "md", lg: "lg" }}
              fontSize={{ base: "sm", md: "md", lg: "large" }}
            >
              <Thead>
                <Tr>
                  <Th textAlign="center">Product</Th>
                  <Th textAlign="center">Quantity</Th>
                  <Th textAlign="center">Price</Th>
                  <Th textAlign="center">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartQuery.items.map((item) => (
                  <Tr key={item.id}>
                    <Td textAlign="center">
                      <HStack
                        spacing={{ base: 2, md: 4 }}
                        justifyContent={{ base: "center", md: "start" }}
                      >
                        <Image
                          borderRadius={5}
                          height={{ base: "2.5rem", md: "5rem" }}
                          width={{ base: "2.5rem", md: "5rem" }}
                          objectFit={"cover"}
                          src={item.product.medias[0]}
                          alt={item.product.name}
                        />
                        <Text
                          textAlign={"start"}
                          me={{ base: 2, md: 8 }}
                          whiteSpace={"wrap"}
                          display={{ base: "none", md: "block" }}
                        >
                          {item.product.name}
                        </Text>
                      </HStack>
                    </Td>

                    <Td>
                      <IncDecCartItem
                        item={item}
                        handleUpdateCartItem={updateCartItem}
                        handleRemoveCartItem={removeCartItem}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Text>$ {item.totalPrice.toFixed(2)}</Text>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        colorScheme="red"
                        size={{ base: "xs", md: "sm" }}
                        variant={"outline"}
                        p={{ base: 1, md: 2 }}
                        onClick={() => removeCartItem(item.id)}
                      >
                        <BiTrash />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem gridArea="side">
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            textAlign={"center"}
            bg={useColorModeValue("gray.50", "gray.700")}
          >
            <Stack spacing={5}>
              <Text
                fontSize={{ base: "large", md: "x-large" }}
                fontWeight={"bold"}
              >
                Cart Summary
              </Text>
              <Text fontSize={{ base: "md", md: "large" }}>
                Total Items: {cartQuery.items.length}
              </Text>
              <Text fontSize={{ base: "md", md: "large" }}>
                Total: $ {cartQuery.totalPrice.toFixed(2)}
              </Text>
              <Button colorScheme="blue" size={{ base: "sm", md: "lg" }}>
                Proceed
              </Button>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CartPage;
