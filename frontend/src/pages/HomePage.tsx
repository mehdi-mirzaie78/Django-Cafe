import { SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import ProductCardContainer from "../components/ProductCardContainer";
import products from "../data/products";

const HomePage = () => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding="10px"
    >
      {products.results.map((product) => (
        <ProductCardContainer key={product.id}>
          <ProductCard product={product} />
        </ProductCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default HomePage;
