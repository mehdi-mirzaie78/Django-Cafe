import { Box, Heading } from "@chakra-ui/react";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";

const HomePage = () => {
  return (
    <Box padding="10px">
      <Heading
        textAlign={"center"}
        px={3}
        mb={6}
        fontSize={{ base: "large", md: "xx-large" }}
      >
        Categories
      </Heading>

      <Categories />

      <ProductGrid />
    </Box>
  );
};

export default HomePage;
