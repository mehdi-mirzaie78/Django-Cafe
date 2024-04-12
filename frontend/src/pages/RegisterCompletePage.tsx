import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import RegisterCompleteForm, {
  RegisterCompleteFormData,
} from "../components/RegisterCompleteForm";
import useRegisterComplete from "../hooks/userRegisterComplete";
import useRegisterQueryStore from "../store/registerStore";
import ErrorMessage from "../components/ErrorMessage";

const RegisterCompletePage = () => {
  const phone = useRegisterQueryStore((s) => s.registerQuery.phone);
  const { mutate, error, isLoading } = useRegisterComplete();

  const submitHandler = (data: RegisterCompleteFormData) => {
    if (phone) mutate({ ...data, phone: phone });
  };
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Complete Registeration
        </Heading>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.50", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <RegisterCompleteForm onSubmit={submitHandler} />
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
  );
};

export default RegisterCompletePage;
