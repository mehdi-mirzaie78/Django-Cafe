import AuthFormContainer from "../components/AuthFormContainer";
import ErrorMessage from "../components/ErrorMessage";
import RegisterForm, { RegisterFormData } from "../components/RegisterForm";
import useRegister from "../hooks/useRegister";
import useRegisterQueryStore from "../store/registerStore";

const RegisterPage = () => {
  const setPhone = useRegisterQueryStore((s) => s.setPhone);

  const { mutate, error } = useRegister();

  const submitHandler = (data: RegisterFormData) => {
    setPhone(data.phone);
    mutate(data.phone);
  };

  return (
    <AuthFormContainer
      heading="Register"
      text="to enjoy all of our cool features ✌️"
      route={{ name: "Login", text: "Already a user?", path: "/login" }}
    >
      <RegisterForm onSubmit={submitHandler} />
      <ErrorMessage error={error} />
    </AuthFormContainer>
  );
};

export default RegisterPage;
