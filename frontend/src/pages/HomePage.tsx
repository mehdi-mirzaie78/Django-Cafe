import { Box, HStack } from "@chakra-ui/react";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import SortingOrder from "../components/SortingOrder";

const HomePage = () => {
  return (
    <Box padding="10px">
      <HStack
        marginBottom={8}
        justifyContent="space-between"
        alignItems={"start"}
      >
        <Categories />
        <SortingOrder />
      </HStack>
      <ProductGrid />
    </Box>
  );
};

export default HomePage;
