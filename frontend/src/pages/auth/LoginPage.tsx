import { Stack } from "@chakra-ui/react";
import AuthFormContainer from "../../components/AuthFormContainer";
import ErrorMessage from "../../components/ErrorMessage";
import LoginForm, { LoginFormData } from "../../components/LoginForm";
import useLogin from "../../hooks/auth/useLogin";

const LoginPage = () => {
  const { mutate, error } = useLogin();

  const submitHandler = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <AuthFormContainer
      heading="Login"
      route={{
        name: "Register",
        text: "You don't have an account?",
        path: "/register",
      }}
    >
      <Stack spacing={4}>
        <LoginForm onSubmit={submitHandler} />
        <ErrorMessage error={error} />
      </Stack>
    </AuthFormContainer>
  );
};

export default LoginPage;
