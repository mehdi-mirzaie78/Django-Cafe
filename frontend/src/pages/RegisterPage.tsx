import {
  Alert,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRegister from "../hooks/useRegister";
import useRegisterQueryStore from "../store/registerStore";
import Loader from "../components/Loader";
import Message from "../components/Message";

const schema = z.object({
  phone: z
    .string()
    .regex(new RegExp("^09+[0-9]*"), {
      message: "Phone number must be in this format 09XXXXXXXXX",
    })
    .min(11, { message: "Phone number must be 11 digits" })
    .max(11, { message: "Phone number must be 11 digits" }),
});

type RegisterFormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const setPhone = useRegisterQueryStore((s) => s.setPhone);

  const { mutate, error, isLoading } = useRegister();

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
              <form
                onSubmit={handleSubmit((data) => {
                  setPhone(data.phone);
                  mutate(data.phone);
                  reset();
                })}
              >
                <FormControl id="phone" isRequired>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Input
                    maxLength={11}
                    placeholder="09XXXXXXXXX"
                    {...register("phone")}
                    type="text"
                    size={{ base: "sm", md: "md", xl: "lg" }}
                    textAlign={"center"}
                  />
                  {errors.phone && (
                    <Message title="" status="error" marginTop={5}>
                      {errors.phone.message}
                    </Message>
                  )}
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
                    <Message key={index} status="error">
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
