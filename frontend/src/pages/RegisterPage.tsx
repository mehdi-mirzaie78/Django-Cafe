import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useRegisterQueryStore from "../store/registerStore";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const { registerQuery, setPhoneNumber } = useRegisterQueryStore();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log("form submitted");
    if (ref.current) setPhoneNumber(ref.current.value);
    navigate("/verify");
  };
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={8}
        px={6}
        boxSize={{ base: "md", md: "lg" }}
      >
        <Stack align={"center"}>
          <Heading fontSize={{ base: "lg", md: "4xl" }} textAlign={"center"}>
            Register
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.50", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={submitHandler}>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  ref={ref}
                  type="text"
                  size={{ base: "sm", md: "md", xl: "lg" }}
                />
              </FormControl>

              <Stack spacing={10} pt={2} marginTop={3}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size={{ base: "sm", md: "md", xl: "lg" }}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Send OTP
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
