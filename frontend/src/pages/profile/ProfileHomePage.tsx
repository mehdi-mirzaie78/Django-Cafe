import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Show,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";

const ProfileHomePage = () => {
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");

  return (
    <Stack h={"100%"} width={"100%"} spacing={4}>
      <Box border={border} borderRadius={5} p={5}>
        <HStack justify={"space-between"}>
          <Heading
            as={"h2"}
            fontSize={{ base: "medium", lg: "large", xl: "x-large" }}
          >
            Orders
          </Heading>
          <Link to={"orders"}>
            <Button
              variant={"ghost"}
              colorScheme={"blue"}
              fontSize={{ base: "x-small", lg: "small", xl: "medium" }}
            >
              See All
            </Button>
          </Link>
        </HStack>
        <HStack
          p={{ base: 1, lg: 5 }}
          justifyContent={"center"}
          spacing={{ base: 2, md: 10, lg: 20 }}
        >
          <Badge
            fontSize={{
              base: "x-small",
              md: "small",
              xl: "large",
            }}
            p={{ base: 1, lg: 2 }}
            rounded={5}
            colorScheme="blue"
            variant={"outline"}
          >
            In Progress
          </Badge>
          <Badge
            fontSize={{
              base: "x-small",
              md: "small",
              xl: "large",
            }}
            p={{ base: 1, lg: 2 }}
            rounded={5}
            colorScheme="green"
            variant={"outline"}
          >
            Completed
          </Badge>
          <Badge
            fontSize={{
              base: "x-small",
              md: "small",
              xl: "large",
            }}
            p={{ base: 1, lg: 2 }}
            rounded={5}
            colorScheme="red"
            variant={"outline"}
          >
            Cancelled
          </Badge>
        </HStack>
      </Box>

      <Box border={border} borderRadius={5} p={5}>
        <HStack justify={"space-between"}>
          <Heading
            as={"h2"}
            fontSize={{ base: "medium", lg: "large", xl: "x-large" }}
          >
            Favorite Products
          </Heading>
          <Link to="favorite-products">
            <Button
              variant={"ghost"}
              colorScheme={"blue"}
              fontSize={{ base: "x-small", lg: "small", xl: "medium" }}
            >
              See All
            </Button>
          </Link>
        </HStack>
      </Box>
      <Show above="md">
        <Box border={border} borderRadius={5} p={5}>
          <HStack justify={"space-between"}>
            <Heading
              as={"h2"}
              fontSize={{ base: "medium", lg: "large", xl: "x-large" }}
            >
              Your Reviews
            </Heading>
            <Link to="reviews">
              <Button
                variant={"ghost"}
                colorScheme={"blue"}
                fontSize={{ base: "x-small", lg: "small", xl: "medium" }}
              >
                See All
              </Button>
            </Link>
          </HStack>
        </Box>
      </Show>
    </Stack>
  );
};

export default ProfileHomePage;
