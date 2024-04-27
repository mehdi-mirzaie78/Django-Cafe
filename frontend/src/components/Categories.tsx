import { Center, HStack } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";
import { useProductQueryStore } from "../store";
import CategoryCard from "./CategoryCard";
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
    <HStack
      spacing={{ base: 4, md: 8 }}
      padding={5}
      marginX={3}
      mb={10}
      overflowX={"auto"}
      justifyContent={{ base: "start", md: "center" }}
      borderRadius={5}
      backgroundImage="https://plus.unsplash.com/premium_photo-1674476933026-aa7f5652af8a?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    >
      {data?.results.map((category) => (
        <CategoryCard
          category={category}
          setCategoryId={setCategoryId}
          key={category.id}
        />
      ))}
    </HStack>
  );
};

export default Categories;
