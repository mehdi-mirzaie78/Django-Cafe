import {
  Box,
  Container,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useCafe from "../hooks/product/useCafe";
import useContact from "../hooks/product/useContact";
import SocialLinks from "./SocialLinks";

interface LogoProps {
  logo: string;
}
const Logo = ({ logo }: LogoProps) => {
  return (
    <HStack>
      <Image rounded={"50%"} height={10} src={logo} />
      <Text fontWeight={"bold"} fontSize={{ base: "md", md: "lg" }}>
        Cuppa Cloud
      </Text>
    </HStack>
  );
};

const Footer = () => {
  const { data: cafe } = useCafe();
  const { data: contact } = useContact();

  return (
    <Box
      as={"footer"}
      marginTop={"auto"}
      bg={useColorModeValue("gray.50", "gray.700")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo logo={cafe?.logo || ""} />
        <Stack direction={"row"} spacing={6}>
          <Box as="a" href={"#"}>
            Home
          </Box>
          <Box as="a" href={"#"}>
            About
          </Box>
          <Box as="a" href={"#"}>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 {cafe?.title}. All rights reserved</Text>
          {contact && <SocialLinks contact={contact} />}
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
