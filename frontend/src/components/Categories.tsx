import { Button, Center, HStack } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";
import useProductQueryStore from "../store";
import Loader from "./Loader";
import Message from "./Message";

const Categories = () => {
  const setCategoryId = useProductQueryStore((s) => s.setCategoryId);
  const { data, isLoading, error } = useCategories();
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
    <HStack flexWrap={"wrap"}>
      <Button
        size={{ base: "xs", md: "sm", xl: "md" }}
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          setCategoryId("");
        }}
        key={"all"}
      >
        All
      </Button>
      {data?.results.map((category) => (
        <Button
          size={{ base: "xs", md: "sm", xl: "md" }}
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            setCategoryId(category.slug);
          }}
          key={category.id}
        >
          {category.name}
        </Button>
      ))}
    </HStack>
  );
};

export default Categories;
