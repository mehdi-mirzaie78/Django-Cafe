import {
  Box,
  Button,
  Center,
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
import { FormEvent, useRef } from "react";
import useRegister from "../hooks/useRegister";
import useRegisterQueryStore from "../store/registerStore";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setPhone = useRegisterQueryStore((s) => s.setPhone);

  const { mutate, error, isPending } = useRegister();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (ref.current && ref.current.value) {
      const phone = ref.current.value;
      setPhone(phone);
      mutate(phone);
    }
  };
  if (isPending)
    return (
      <Center marginTop={20}>
        <Loader />
      </Center>
    );

  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Stack spacing={8} w={"full"} mx={"auto"} maxW={"lg"} py={8} px={6}>
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
                    placeholder="09XXXXXXXXX"
                    ref={ref}
                    type="text"
                    size={{ base: "sm", md: "md", xl: "lg" }}
                    textAlign={"center"}
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
                {error &&
                  error.response &&
                  Object.values(
                    error.response.data as { [key: string]: unknown }
                  ).map((e, index) => (
                    <Message key={index} title="Error" status="error">
                      {e}
                    </Message>
                  ))}
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
    </>
  );
};

export default RegisterPage;
