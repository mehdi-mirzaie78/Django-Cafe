import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormErrors from "./FormErrors";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <Stack spacing={3}>
        <FormControl id="username" isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            {...register("username")}
            type="text"
            placeholder="Email or Phone"
            size={{ base: "sm", md: "md", xl: "lg" }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={4} pt={2} marginTop={3}>
          <Button
            type="submit"
            size={{ base: "sm", md: "md", xl: "lg" }}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Login
          </Button>
        </Stack>
        <FormErrors errors={errors} />
      </Stack>
    </form>
  );
};

export default LoginForm;
