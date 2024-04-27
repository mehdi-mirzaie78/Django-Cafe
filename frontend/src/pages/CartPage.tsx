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
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import useCart from "../hooks/useCart";
import useRemoveCartItem from "../hooks/useRemoveCartItem";
import useCartQueryStore from "../store/cartStore";
import useCreateCart from "../hooks/useCreateCart";
import { useEffect } from "react";

const CartPage = () => {
  const cartQuery = useCartQueryStore((s) => s.cartQuery);

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

  const handleRemoveCartItem = (id: number) => {
    removeCartItem(id);
  };

  if (cartQuery?.items?.length === 0) {
    return (
      <Center>
        <Text fontSize={"x-large"} fontWeight={"bold"}>
          Your cart is empty
        </Text>
      </Center>
    );
  }
  if (cartQuery?.items)
    return (
      <Box maxW={"100vw"}>
        <Grid
          templateAreas={{ base: "'side' 'main'", md: "'main side'" }}
          templateColumns={{ base: "1fr", md: "2fr 1fr" }}
          gap={10}
          padding={5}
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
                variant="striped"
                size={{ base: "sm", md: "md", lg: "lg" }}
                fontSize={"large"}
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
                        <HStack spacing={5}>
                          <Image
                            borderRadius={5}
                            height={{ base: "3rem", md: "5rem" }}
                            width={{ base: "3rem", md: "5rem" }}
                            objectFit={"cover"}
                            src={item.product.medias[0]}
                            alt={item.product.name}
                          />
                          <Text>{item.product.name}</Text>
                        </HStack>
                      </Td>

                      <Td>
                        <HStack spacing={4} justifyContent={"center"}>
                          <Button colorScheme="red" size="sm" variant="outline">
                            -
                          </Button>
                          <Text>{item.quantity}</Text>
                          <Button
                            colorScheme="blue"
                            size="sm"
                            variant="outline"
                          >
                            +
                          </Button>
                        </HStack>
                      </Td>
                      <Td textAlign="center">
                        <Text>$ {item.totalPrice.toFixed(2)}</Text>
                      </Td>
                      <Td textAlign="center">
                        <Button
                          colorScheme="red"
                          variant={"outline"}
                          p={2}
                          onClick={() => handleRemoveCartItem(item.id)}
                        >
                          <BiTrash size={22} />
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
                <Text fontSize={"x-large"} fontWeight={"bold"}>
                  Cart Summary
                </Text>
                <Text fontSize={"large"}>
                  Total Items: {cartQuery.items.length}
                </Text>
                <Text fontSize={"large"}>
                  Total: $ {cartQuery.totalPrice.toFixed(2)}
                </Text>
                <Button colorScheme="green">Proceed</Button>
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    );
};

export default CartPage;
