import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "../entities/Product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card
      maxW="sm"
      maxH="lg"
      p={2}
      bg={useColorModeValue("gray.100", "gray.700")}
      color={useColorModeValue("gray.900", "gray.50")}
    >
      <Image
        src={product.media[0].file}
        height="18rem"
        objectFit={"cover"}
        borderRadius={10}
      />
      <CardBody paddingBottom={3}>
        <HStack
          justifyContent="space-between"
          marginBottom={{ base: 1, lg: 3 }}
        >
          <Heading fontSize={{ base: "md", md: "xl" }}>
            <Link to={"/products/" + product.slug}>{product.name}</Link>
          </Heading>

          <Badge
            colorScheme="green"
            fontSize={{ base: "md", md: "xl" }}
            px={3}
            rounded={5}
          >
            $ {product.price}
          </Badge>
        </HStack>

        <Text fontSize="sm">
          {product.description.length >= 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </Text>
        <HStack marginTop={{ base: 3, md: 3 }} justifyContent="center">
          <Button bg={useColorModeValue("blue.100", "blue.700")} size={{ base: "xs", md: "sm", xl: "md" }}>
            <AddIcon me={2} /> Add to cart
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
