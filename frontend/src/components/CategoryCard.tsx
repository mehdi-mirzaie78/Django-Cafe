import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Category from "../entities/Category";

interface Props {
  category: Category;
  setCategoryId: (category: string) => void;
}

const CategoryCard = ({ category, setCategoryId }: Props) => {
  // checking if there's a category called all then we don't need to specify a slug for the requests
  if (category.name.toLowerCase() === "all") category.slug = "";

  return (
    <Card
      key={category.id}
      minW={"5rem"}
      width={{ base: "5rem", md: "7rem", lg: "10rem" }}
      bg={useColorModeValue("gray.100", "gray.700")}
      color={useColorModeValue("gray.900", "gray.50")}
      _hover={{
        transform: "scale(1.06)",
        transition: "transform .15s ease-in",
      }}
    >
      <CardBody p={0}>
        <Image
          minW={"5rem"}
          filter={"blur(0.1px)"}
          src={category.image}
          height={{ base: "5rem", md: "7rem", lg: "10rem" }}
          width={"100%"}
          objectFit={"cover"}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          onClick={() => setCategoryId(category.slug)}
          cursor={"pointer"}
        />
      </CardBody>
      <CardFooter py={1} justifyContent={"center"}>
        <Text
          textShadow={"0.5px 0.5px gray.200"}
          fontSize={{ base: 10, md: 15 }}
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
          fontStyle={"italic"}
          onClick={() => setCategoryId(category.slug)}
          cursor={"pointer"}
        >
          {category.name.toUpperCase()}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
