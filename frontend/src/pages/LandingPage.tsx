import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useCafe from "../hooks/product/useCafe";

const LandingPage = () => {
  const { data: cafe, error } = useCafe();
  if (error) throw error;

  return (
    <Box height={"100vh"}>
      <div className="overlay" />
      <video className="video" src={cafe?.video} autoPlay loop muted />
      <Stack
        textAlign={"center"}
        paddingTop={"10rem"}
        spacing={{ base: 4, md: 5, lg: 6 }}
        color={"white"}
        position={"absolute"}
        width={"100%"}
        height={"100%"}
        top={"0"}
        bg={"rgba(0,0,0,0.35)"}
        alignItems={"center"}
      >
        <Link to="/home">
          <Image
            src={cafe?.icon}
            boxSize={{ base: "6.5rem", md: "12rem" }}
            rounded={"50%"}
            objectFit="cover"
          />
        </Link>
        <Heading fontSize={{ base: "x-large", md: "xx-large" }}>
          {cafe?.title}
        </Heading>

        <Stack fontFamily={"fantasy"} fontStyle={"italic"} paddingX={3}>
          <Text fontSize={{ base: "large", md: "x-large" }}>{cafe?.motto}</Text>
          <Text fontSize={{ base: "large", md: "x-large" }}>{cafe?.about}</Text>
        </Stack>
        <Link to="/home">
          <Button color={"white"} bg={"blue.600"} _hover={{ bg: "blue.500" }}>
            Continue
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default LandingPage;
