import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import useRegisterVerify from "../hooks/useRegisterVerify";
import useRegisterQueryStore from "../store/registerStore";

const RegisterVerifyPage = () => {
  const { phone, otp } = useRegisterQueryStore((s) => s.registerQuery);
  const setOtp = useRegisterQueryStore((s) => s.setOtp);

  const { mutate } = useRegisterVerify();

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
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Phone Number
          </Heading>
        </Center>

        <Box
          boxShadow={"lg"}
          p={8}
          bg={useColorModeValue("gray.50", "gray.700")}
        >
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
            marginBottom={3}
          >
            We have sent code to{" "}
            <Text
              ms={1}
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="bold"
              color={useColorModeValue("gray.800", "gray.400")}
            >
              {phone}
            </Text>
          </Center>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <Center>
                  <HStack>
                    <PinInput otp onComplete={(value) => setOtp(value)}>
                      {[...Array(6)].map((i, index) => (
                        <PinInputField key={index} />
                      ))}
                    </PinInput>
                  </HStack>
                </Center>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  disabled={!otp}
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Verify
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterVerifyPage;
