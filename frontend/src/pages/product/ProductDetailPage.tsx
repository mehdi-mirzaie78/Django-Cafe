import {
  Box,
  Center,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CaptionCarousel from "../../components/ImageCarousel";
import Loader from "../../components/Loader";
import useProduct from "../../hooks/product/useProduct";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug!);

  if (isLoading) return <Loader />;

  if (error || !product) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} padding="10px">
      <GridItem>
        <Heading as="h1" size="lg" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="md" mb={4}>
          {product.description}
        </Text>
      </GridItem>
      <GridItem>
        <Center>
          <Box width={{ base: "100%", lg: "80%" }}>
            <CaptionCarousel images={product.media} />
          </Box>
        </Center>
      </GridItem>
    </SimpleGrid>
  );
};

export default ProductDetailPage;
