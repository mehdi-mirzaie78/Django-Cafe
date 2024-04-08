import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import ProductCardContainer from "../components/ProductCardContainer";
import { getProducts } from "../store/actions";
import { RootState } from "../store/rootReducer";

const HomePage = () => {
  const dispatch = useDispatch<any>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      spacing={6}
      padding="10px"
    >
      {data.results.map((product) => (
        <ProductCardContainer key={product.id}>
          <ProductCard product={product} />
        </ProductCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default HomePage;
