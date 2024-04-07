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
  useColorModeValue
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "../entities/Product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card
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
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <Heading fontSize="2xl">
            <Link to={"/products/" + product.slug}>{product.name}</Link>
          </Heading>
          <Heading fontSize="2xl">
            <Badge colorScheme="green" fontSize={"2xl"} px={3} rounded={5}>
              $ {product.price}
            </Badge>
          </Heading>
        </HStack>

        <Text>
          {product.description.length >= 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </Text>
        <HStack marginTop={5} justifyContent="center">
          <Button bg="none">
            <AddIcon color="blue.300" />
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
