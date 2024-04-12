import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  CloseButton,
  HStack
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

  const onClose = () => {
    setIsClosed(true);
  };

  return !isClosed ? (
    <Alert status={status} rounded={"lg"} {...props}>
      <AlertIcon />
      <HStack justifyContent={"space-between"} width={"full"}>
        <Box display="row">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{children}</AlertDescription>
        </Box>

        {isClosable && (
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={onClose}
          />
        )}
      </HStack>
    </Alert>
  ) : null;
};

export default Message;
