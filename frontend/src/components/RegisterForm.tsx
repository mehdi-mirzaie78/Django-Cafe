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

export type RegisterFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: RegisterFormData) => void;
}

const RegisterForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
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
      </FormControl>

      <Stack spacing={4} pt={2} marginTop={3}>
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

        {errors.phone && (
          <Message status="error">{errors.phone.message}</Message>
        )}
      </Stack>
    </form>
  );
};

export default RegisterForm;
