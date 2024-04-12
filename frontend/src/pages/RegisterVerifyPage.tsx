import {
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { FormEvent } from "react";
import CountdownTimer from "../components/CountdownTimer";
import ErrorMessage from "../components/ErrorMessage";
import RegisterVerifyForm from "../components/RegisterVerifyForm";
import useRegisterVerify from "../hooks/useRegisterVerify";
import useRegisterQueryStore from "../store/registerStore";

const RegisterVerifyPage = () => {
  const { phone, otp } = useRegisterQueryStore((s) => s.registerQuery);
  const setOtp = useRegisterQueryStore((s) => s.setOtp);

  const { mutate, error, isLoading } = useRegisterVerify();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (phone && otp) mutate({ phone, otp });
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={4} w={"full"} maxW={"md"} rounded={"xl"} p={6} my={10}>
        <Center>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", md: "4xl" }}
            marginBottom={3}
          >
            Verification
          </Heading>
        </Center>

        <Box
          boxShadow={"lg"}
          rounded={"lg"}
          p={8}
          bg={useColorModeValue("gray.50", "gray.700")}
        >
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
            marginBottom={3}
          >
            We have sent a code to
            <Text
              ms={1}
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="bold"
              color={useColorModeValue("gray.800", "gray.400")}
            >
              {phone}
            </Text>
          </Center>

          <RegisterVerifyForm
            setOtp={setOtp}
            handleSubmit={handleSubmit}
            otp={otp}
          />
          <ErrorMessage error={error} marginY={3} />

          <CountdownTimer />
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterVerifyPage;
