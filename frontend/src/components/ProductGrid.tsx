import { Center, HStack, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment } from "react/jsx-runtime";
import useProducts from "../hooks/product/useProducts";
import Loader from "./Loader";
import Message from "./Message";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
import SortingOrder from "./SortingOrder";

const ProductGrid = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useProducts();

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

  // total number of items we have fetched so far
  const fetchedProductsCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      style={{ overflow: "hidden" }}
      dataLength={fetchedProductsCount}
      hasMore={!!hasNextPage} // !! converts undefined to boolean
      next={() => fetchNextPage()}
      loader={
        <HStack marginY={5} justifyContent="center">
          <Spinner
            justifyContent="center"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </HStack>
      }
    >
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        px={3}
        mb={5}
        spacing={3}
      >
        <Heading
          fontSize={{ base: "md", md: "xx-large" }}
          textAlign={"center"}
          mb={5}
          my={0}
        >
          Products
        </Heading>
        <SortingOrder />
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
        spacing={6}
        padding={2}
      >
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page?.results.map((product) => (
              <ProductCardContainer key={product.id}>
                <ProductCard product={product} />
              </ProductCardContainer>
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default ProductGrid;
