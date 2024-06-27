import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import Categories from "../../components/Categories";
import ProductGrid from "../../components/ProductGrid";
import useCreateCart from "../../hooks/order/useCreateCart";

const HomePage = () => {
  const { mutate } = useCreateCart();
  useEffect(() => {
    mutate();
  }, []);

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
