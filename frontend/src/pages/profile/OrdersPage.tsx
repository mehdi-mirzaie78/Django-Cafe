import {
  Center,
  HStack,
  List,
  ListItem,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import useOrders from "../../hooks/order/useOrders";

const OrdersPage = () => {
  const { data: orders } = useOrders();
  const [order, setOrder] = useState("");
  return (
    <Center>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab onClick={() => setOrder("In Progress Orders")}>In Progress</Tab>
          <Tab onClick={() => setOrder("Completed Orders")}>Completed</Tab>
          <Tab onClick={() => setOrder("Cancelled Orders")}>Cancelled</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="0.3rem"
          bg={useColorModeValue("blue.500", "blue.200")}
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <List>
              {orders?.results.map((order) => (
                <ListItem key={order.id}>
                  <HStack>
                    <p>{order.id}</p>
                    <p>{order.orderType}</p>
                    <p>{order.status}</p>
                    <p>{order.totalPrice}</p>
                    <p>{order.createdAt}</p>
                    <p>{order.isPaid}</p>
                    <p>{order.table}</p>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </TabPanel>
          <TabPanel>
            <p>{order}</p>
          </TabPanel>
          <TabPanel>
            <p>{order}</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default OrdersPage;
