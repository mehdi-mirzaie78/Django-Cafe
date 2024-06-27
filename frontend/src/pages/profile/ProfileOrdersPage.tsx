import {
  Box,
  Flex,
  HStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import useOrders from "../../hooks/order/useOrders";

const ProfileOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const {
    data: orders,
    error,
    isLoading,
    refetch,
  } = useOrders({ pageParam: currentPage });
  const [order, setOrder] = useState("");
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");
  const bg = useColorModeValue("blue.500", "blue.200");

  return (
    <Box border={border} borderRadius={5} h="100%" w="100%" p={5}>
      <Tabs
        position="relative"
        variant="unstyled"
        fontSize={{ base: "small", lg: "medium" }}
      >
        <TabList justifyContent={"center"} gap={{ base: 4, md: 8 }}>
          <Tab
            p={1}
            fontSize={{ base: "small", lg: "medium", xl: "large" }}
            onClick={() => setOrder("In Progress Orders")}
          >
            In Progress
          </Tab>
          <Tab
            p={1}
            fontSize={{ base: "small", lg: "medium", xl: "large" }}
            onClick={() => setOrder("Completed Orders")}
          >
            Completed
          </Tab>
          <Tab
            p={1}
            fontSize={{ base: "small", lg: "medium", xl: "large" }}
            onClick={() => setOrder("Cancelled Orders")}
          >
            Cancelled
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height={"0.3rem"}
          bg={bg}
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel height={"25rem"}>
            <Flex
              direction="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box overflowX="auto" mb={10}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Order Type</Th>
                      <Th>Status</Th>
                      <Th>Created At</Th>
                      <Th>Table</Th>
                      <Th>Payment Status</Th>
                      <Th>Total Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders?.results.map((order) => (
                      <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.orderType}</Td>
                        <Td>{order.status}</Td>
                        <Td>{order.createdAt}</Td>
                        <Td>{order.table}</Td>
                        <Td>{order.isPaid}</Td>
                        <Td>$ {order.totalPrice}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              <HStack
                spacing={4}
                width={"100%"}
                justifyContent={"center"}
                pos={"relative"}
                bottom={-5}
              >
                {orders && (
                  <Pagination
                    currentPage={currentPage}
                    totalCount={orders?.count}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(Number(page))}
                  />
                )}
              </HStack>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>{order}</p>
          </TabPanel>
          <TabPanel>
            <p>{order}</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfileOrdersPage;
