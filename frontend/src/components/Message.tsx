import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props extends AlertProps {
  title?: string;
  status: "success" | "error" | "info" | "warning";
  children: any;
  isClosable?: boolean;
  [key: string]: any;
}

const Message = ({
  title = "",
  status,
  children,
  isClosable = false,
  ...props
}: Props) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  return !isClosed ? (
    <Alert status={status} rounded={"lg"} {...props}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Box>
      {isClosable && <CloseButton onClick={handleClose} />}
    </Alert>
  ) : null;
};

export default Message;
