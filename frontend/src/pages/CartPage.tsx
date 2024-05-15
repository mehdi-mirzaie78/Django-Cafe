import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import IncDecCartItem from "../components/IncDecCartItem";
import Loader from "../components/Loader";
import useCart from "../hooks/useCart";
import useCreateCart from "../hooks/useCreateCart";
import useCreateOrder from "../hooks/useCreateOrder";
import useOrderTypes from "../hooks/useOrderTypes";
import useRemoveCartItem from "../hooks/useRemoveCartItem";
import useTables from "../hooks/useTables";
import useUpdateCartItem from "../hooks/useUpdateCartItem";
import useAuthQueryStore from "../store/authStore";
import useCartQueryStore from "../store/cartStore";
import useOrderQueryStore from "../store/orderStore";

const CartPage = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const authQuery = useAuthQueryStore((s) => s.authQuery);
  const cartQuery = useCartQueryStore((s) => s.cartQuery);
  const { mutate: updateCartItem, error: updateError } = useUpdateCartItem();

  const { mutate: createCart, isLoading: isCreatingCart } = useCreateCart();
  
  const { data: cartData, refetch: refetchCart } = useCart(
    cartQuery.id,
    !isCreatingCart
  );

  const { orderQuery, setOrderType, setTable } = useOrderQueryStore();
  const { data: orderTypes, isLoading: isOrderTypeLoading } = useOrderTypes();
  const { data: tables, isLoading: isTablesLoading } = useTables();
  const { mutate: removeCartItem } = useRemoveCartItem();
  const { mutate: createOrder } = useCreateOrder();

  useEffect(() => {
    if (!cartQuery.id && !isCreatingCart) {
      createCart();
    } else if (!cartData) {
      refetchCart();
    }
  }, [cartQuery, createCart, refetchCart, cartData]);

  if (cartQuery?.items?.length === 0) {
    return (
      <Center>
        <Text fontSize={"x-large"} fontWeight={"bold"}>
          Your cart is empty
        </Text>
      </Center>
    );
  }
  if (isTablesLoading || isOrderTypeLoading) return <Loader />;

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
            bg={bg}
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
            bg={bg}
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
              <Menu matchWidth>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {orderQuery.orderType
                    ? orderQuery.orderType.toUpperCase()
                    : "Order Type"}
                </MenuButton>
                <MenuList>
                  {orderTypes &&
                    Object.keys(orderTypes).map((t) => (
                      <MenuItem
                        justifyContent={"center"}
                        key={t}
                        onClick={() => setOrderType(t)}
                      >
                        {t.toUpperCase()}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>

              {orderQuery?.orderType === "dinein" && (
                <Menu matchWidth>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {orderQuery.table
                      ? `${orderQuery.table.name} - Capacity: ${orderQuery.table.capacity}`
                      : "Select Table"}
                  </MenuButton>
                  <MenuList>
                    {tables &&
                      tables.results.map((table) => (
                        <MenuItem
                          justifyContent={"center"}
                          key={table.id}
                          onClick={() => {
                            setTable(table);
                          }}
                        >
                          {table.name} - Capacity: {table.capacity}
                        </MenuItem>
                      ))}
                  </MenuList>
                </Menu>
              )}
              {authQuery.accessToken &&
              orderQuery.orderType === "dinein" &&
              orderQuery.table ? (
                <Button
                  colorScheme="blue"
                  size={{ base: "sm", md: "lg" }}
                  onClick={() =>
                    createOrder({
                      cartId: cartQuery.id,
                      orderType: orderQuery.orderType,
                      tableId: orderQuery.table?.id,
                    })
                  }
                >
                  Place Order
                </Button>
              ) : (
                !authQuery.accessToken && (
                  <Link to="/login?redirect=/checkout/cart">
                    <Button
                      color={"blue.500"}
                      _hover={{ color: "blue.400" }}
                      variant={"ghost"}
                      size={{ base: "sm", md: "lg" }}
                    >
                      To proceed login please
                    </Button>
                  </Link>
                )
              )}
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CartPage;
