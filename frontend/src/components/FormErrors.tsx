import Message from "./Message";
import { Stack } from "@chakra-ui/react";
interface Error {
  message?: string;
}

interface Errors {
  [key: string]: Error;
}

interface Props {
  errors: Errors;
}

const FormErrors = ({ errors }: Props) => {
  return (
    <Stack spacing={2}>
      {Object.keys(errors).map((fieldName) => (
        <Message key={fieldName} status="error">
          {errors[fieldName].message}
        </Message>
      ))}
    </Stack>
  );
};

export default FormErrors;
