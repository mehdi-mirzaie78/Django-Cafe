import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface routeProps {
  name: string;
  text: string;
  path: string;
}

interface Props {
  heading: string;
  text?: string;
  children: ReactNode;
  route?: routeProps;
}

const AuthFormContainer = ({ heading, text, children, route }: Props) => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={6} w={"full"} mx={"auto"} maxW={"lg"} py={8} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={{ base: "lg", md: "4xl" }} textAlign={"center"}>
            {heading}
          </Heading>
          {text && (
            <Text fontSize={{ base: "md", md: "lg" }} color={"gray.600"}>
              {text}
            </Text>
          )}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.50", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {children}

            {route && (
              <Stack pt={3}>
                <Text align={"center"}>
                  {route.text}{" "}
                  <Link to={route.path}>
                    <Text display={"inline"} color={"blue.400"}>
                      {route.name}
                    </Text>
                  </Link>
                </Text>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AuthFormContainer;
