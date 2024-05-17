import {
  Box,
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

const ProfileOrdersPage = () => {
  const { data: orders } = useOrders();
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
    </Box>
  );
};

export default ProfileOrdersPage;
