import { Center, SimpleGrid } from "@chakra-ui/react";
import useProducts from "../hooks/useProducts";
import Loader from "./Loader";
import Message from "./Message";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";

const ProductGrid = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading)
    return (
      <Center marginTop={20}>
        <Loader />
      </Center>
    );

  if (error)
    return (
      <Message title="ERROR" status="error">
        {error.message}
      </Message>
    );

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding="10px"
    >
      {data?.results.map((product) => (
        <ProductCardContainer key={product.id}>
          <ProductCard product={product} />
        </ProductCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
