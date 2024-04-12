import { AxiosError } from "axios";
import Message from "./Message";
import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  error: AxiosError<unknown, any> | null;
  [key: string]: any;
}

const ErrorMessage = ({ error, ...props }: Props) => {
  if (error && error.response && error.response.data) {
    const responseData = error.response.data as { [key: string]: string };
    return (
      <Box {...props}>
        {Object.keys(responseData).map((key) => (
          <Message
            key={key}
            title={key !== "nonFieldErrors" ? key : "Error"}
            status="error"
            isClosable
          >
            {responseData[key]}
          </Message>
        ))}
      </Box>
    );
  }
  return null;
};

export default ErrorMessage;
