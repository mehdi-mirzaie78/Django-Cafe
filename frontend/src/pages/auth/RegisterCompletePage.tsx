import { Stack } from "@chakra-ui/react";
import AuthFormContainer from "../../components/AuthFormContainer";
import ErrorMessage from "../../components/ErrorMessage";
import RegisterCompleteForm, {
  RegisterCompleteFormData,
} from "../../components/RegisterCompleteForm";
import useRegisterComplete from "../../hooks/auth/userRegisterComplete";
import useRegisterQueryStore from "../../store/registerStore";

const RegisterCompletePage = () => {
  const phone = useRegisterQueryStore((s) => s.registerQuery.phone);
  const { mutate, error } = useRegisterComplete();

  const submitHandler = (data: RegisterCompleteFormData) => {
    if (phone) mutate({ ...data, phone: phone });
  };
  return (
    <AuthFormContainer heading="Complete Registeration">
      <Stack spacing={4}>
        <RegisterCompleteForm onSubmit={submitHandler} />
        <ErrorMessage error={error} />
      </Stack>
    </AuthFormContainer>
  );
};

export default RegisterCompletePage;
