import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props extends AlertProps {
  title?: string;
  status: "success" | "error" | "info" | "warning";
  children: any;
  [key: string]: any;
}

const Message = ({ title = "", status, children, ...props }: Props) => {
  return (
    <Alert status={status} rounded={"lg"} {...props}>
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Box>
    </Alert>
  );
};

export default Message;
