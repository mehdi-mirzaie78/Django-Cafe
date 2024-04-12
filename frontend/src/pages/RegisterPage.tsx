import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import RegisterForm, { RegisterFormData } from "../components/RegisterForm";
import useRegister from "../hooks/useRegister";
import useRegisterQueryStore from "../store/registerStore";

const RegisterPage = () => {
  const setPhone = useRegisterQueryStore((s) => s.setPhone);

  const { mutate, error, isLoading } = useRegister();

  const submitHandler = (data: RegisterFormData) => {
    setPhone(data.phone);
    mutate(data.phone);
  };
  if (isLoading)
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
              <RegisterForm onSubmit={submitHandler} />

              <ErrorMessage error={error} />

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
