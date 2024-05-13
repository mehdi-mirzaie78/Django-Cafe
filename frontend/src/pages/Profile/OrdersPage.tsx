import {
  Center,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";

const OrdersPage = () => {
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
            <p>{order}</p>
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
