import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  status: "success" | "error" | "info" | "warning";
  children: any;
}
const Message = ({ title, status, children }: Props) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Box>
    </Alert>
  );
};

export default Message;
