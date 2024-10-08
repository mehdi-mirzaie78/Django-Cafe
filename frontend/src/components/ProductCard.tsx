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
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "../entities/Product";
import useAddToCart from "../hooks/order/useAddToCart";
import useRemoveCartItem from "../hooks/order/useRemoveCartItem";
import useUpdateCartItem from "../hooks/order/useUpdateCartItem";
import useCartQueryStore from "../store/cartStore";
import IncDecCartItem from "./IncDecCartItem";
import Rating from "./Rating";
import { BiCart } from "react-icons/bi";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const cartQuery = useCartQueryStore((s) => s.cartQuery);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateCartItem, error: updateError } = useUpdateCartItem();
  const { mutate: removeCartItem } = useRemoveCartItem();

  const productInCart = cartQuery.items?.filter(
    (item) => item.product.id === product.id
  );

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    icon: <BiCart size={20} />,
  });

  return (
    <Card
      maxW="sm"
      maxH="lg"
      p={2}
      bg={useColorModeValue("gray.100", "gray.700")}
      color={useColorModeValue("gray.900", "gray.50")}
    >
      <Link to={"/products/" + product.slug} style={{ height: "18rem" }}>
        {product.discount !== 0 && (
          <Badge
            bg={useColorModeValue("gray.100", "gray.700")}
            top={"0"}
            right={"0"}
            position={"absolute"}
            color={"red"}
            fontSize={{ base: "xs", md: "md", xl: "large" }}
            px={3}
            rounded={5}
          >
            % {product.discount}
          </Badge>
        )}
        <Image
          src={product.media[0].file}
          height="100%"
          width="100%"
          objectFit={"cover"}
          borderRadius={10}
        />
      </Link>
      <CardBody px={2} paddingBottom={3}>
        <HStack
          justifyContent="space-between"
          marginBottom={{ base: 1, lg: 3 }}
        >
          <Heading fontSize={{ base: "md", md: "xl" }}>
            <Link to={"/products/" + product.slug}>{product.name}</Link>
          </Heading>
          <HStack spacing={0}>
            {product.discount && (
              <Badge
                bg={"none"}
                as="s"
                color={"red"}
                fontSize={{ base: "md", md: "large" }}
                px={3}
                rounded={5}
              >
                $ {product.unitPrice}
              </Badge>
            )}
            <Badge
              colorScheme="green"
              fontSize={{ base: "md", md: "large" }}
              px={1}
              rounded={5}
            >
              $ {product.price}
            </Badge>
          </HStack>
        </HStack>

        <Text fontSize="sm">
          {product.description.length >= 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </Text>

        <HStack marginTop={{ base: 3, md: 3 }} justifyContent={"space-between"}>
          <Rating value={product.rating} />
          {product.stock === 0 ? (
            <Badge
              bg="none"
              textOverflow={"ellipsis"}
              py="7px"
              colorScheme="red"
              borderRadius={5}
            >
              Out of Stock
            </Badge>
          ) : productInCart?.length === 0 ? (
            <Button
              onClick={() => {
                toast({
                  title: `${product.name} added to your cart`,
                  status: "success",
                });
                addToCart(product.id);
              }}
              colorScheme="blue"
              size={{ base: "xs", md: "sm" }}
            >
              <HStack>
                <AddIcon me={1} /> <Text>Add</Text>
              </HStack>
            </Button>
          ) : (
            productInCart?.length > 0 && (
              <IncDecCartItem
                item={productInCart[0]}
                handleUpdateCartItem={updateCartItem}
                handleRemoveCartItem={removeCartItem}
                justify="end"
              />
            )
          )}
          )
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
