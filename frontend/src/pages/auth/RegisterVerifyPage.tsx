import { Center, Text, useColorModeValue } from "@chakra-ui/react";
import { FormEvent } from "react";
import AuthFormContainer from "../../components/AuthFormContainer";
import CountdownTimer from "../../components/CountdownTimer";
import ErrorMessage from "../../components/ErrorMessage";
import RegisterVerifyForm from "../../components/RegisterVerifyForm";
import useRegisterVerify from "../../hooks/auth/useRegisterVerify";
import useRegisterQueryStore from "../../store/registerStore";

const RegisterVerifyPage = () => {
  const { phone, otp } = useRegisterQueryStore((s) => s.registerQuery);
  const setOtp = useRegisterQueryStore((s) => s.setOtp);

  const { mutate, error } = useRegisterVerify();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (phone && otp) mutate({ phone, otp });
  };

  return (
    <AuthFormContainer heading="Verification">
      <Center
        fontSize={{ base: "sm", sm: "md" }}
        color={useColorModeValue("gray.800", "gray.400")}
        marginBottom={1}
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

      <ErrorMessage error={error} marginTop={3} />

      <CountdownTimer />
    </AuthFormContainer>
  );
};

export default RegisterVerifyPage;
