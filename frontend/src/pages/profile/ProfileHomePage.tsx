import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";

const ProfileHomePage = () => {
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");

  return (
    <Stack h={"100%"} width={"100%"}>
      <Box border={border} borderRadius={5} p={5}>
        <HStack justify={"space-between"}>
          <Heading as={"h2"} fontSize={"x-large"}>
            Orders
          </Heading>
          <Link to={"orders"}>
            <Button variant={"ghost"} colorScheme={"blue"}>
              See All
            </Button>
          </Link>
        </HStack>
        <HStack p={5} justifyContent={"space-evenly"} spacing={20}>
          <Badge fontSize={"large"} p={2} rounded={5} colorScheme="blue">
            In Progress
          </Badge>
          <Badge fontSize={"large"} p={2} rounded={5} colorScheme="green">
            Completed
          </Badge>
          <Badge fontSize={"large"} p={2} rounded={5} colorScheme="red">
            Cancelled
          </Badge>
        </HStack>
      </Box>
      <Box mt={2} border={border} borderRadius={5} p={5}>
        <HStack justify={"space-between"}>
          <Heading as={"h2"} fontSize={"x-large"}>
            Favorite Products
          </Heading>
          <Link to="favorite-products">
            <Button variant={"ghost"} colorScheme={"blue"}>
              See All
            </Button>
          </Link>
        </HStack>
      </Box>
      <Box mt={2} border={border} borderRadius={5} p={5}>
        <HStack justify={"space-between"}>
          <Heading as={"h2"} fontSize={"x-large"}>
            Your Reviews
          </Heading>
          <Link to="reviews">
            <Button variant={"ghost"} colorScheme={"blue"}>
              See All
            </Button>
          </Link>
        </HStack>
      </Box>
    </Stack>
  );
};

export default ProfileHomePage;
