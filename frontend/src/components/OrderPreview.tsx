import {
  Badge,
  HStack,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Order from "../entities/Order";

interface Props {
  order: Order;
}

const OrderPreview = ({ order }: Props) => {
  const bg = useColorModeValue("gray.50", "gray.800");
  return (
    <VStack w={"100%"} spacing={10} mb={5}>
      <HStack spacing={4} justifyContent={"space-between"} w="90%">
        <Heading as="h2">Order: #{order.id}</Heading>
        <Badge fontSize={"x-large"} px={2} py={1} borderRadius={5}>
          {!order.isPaid ? "Unpaid" : "Paid"}
        </Badge>
      </HStack>

      {/* Table */}
      <TableContainer
        paddingTop={1}
        shadow="md"
        borderWidth="1px"
        borderRadius={5}
        bg={bg}
        w={"90%"}
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
            </Tr>
          </Thead>
          <Tbody>
            {order.orderItems.map((item) => (
              <Tr key={item.id}>
                <Td textAlign="center">
                  <Link to={`/products/${item.product.slug}`}>
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
                  </Link>
                </Td>
                <Td textAlign="center">
                  <Text>{item.quantity}</Text>
                </Td>

                <Td textAlign="center">
                  <Text>$ {Number(item.totalPrice).toFixed(2)}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Table */}
      <TableContainer
        paddingTop={1}
        shadow="md"
        borderWidth="1px"
        borderRadius={5}
        bg={bg}
        w={"90%"}
      >
        <Table
          className="cart-table"
          variant="striped"
          size={{ base: "sm", md: "md", lg: "lg" }}
          fontSize={{ base: "sm", md: "md", lg: "large" }}
        >
          <Thead>
            <Tr>
              <Th textAlign="center">Order Type</Th>
              <Th textAlign="center">Table</Th>
              <Th textAlign="center">Phone</Th>
              <Th textAlign="center">Address</Th>
              <Th textAlign="center">Discount</Th>
              <Th textAlign="center">Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr key="info">
              <Td textAlign="center">{order.orderType.toUpperCase()}</Td>
              <Td textAlign="center">{order.table || "-"}</Td>
              <Td textAlign="center">{order.phone || "-"}</Td>
              <Td textAlign={order.address ? "start" : "center"}>
                <Text w={"100%"} whiteSpace={"initial"}>
                  {order.address || "-"}
                </Text>
              </Td>

              <Td textAlign="center">{order.discount}</Td>
              <Td textAlign="center" fontWeight={"bold"}>
                <Text>$ {order.totalPrice.toFixed(2)}</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default OrderPreview;
