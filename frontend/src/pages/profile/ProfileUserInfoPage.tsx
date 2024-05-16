import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useAuthQueryStore from "../../store/authStore";

const ProfileUserInfoPage = () => {
  const { authQuery, setAuthQuery } = useAuthQueryStore();
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");
  return (
    <Box border={border} borderRadius={5} h="100%" w="100%" p={5}>
      <Flex flexDirection="column" align="center">
        <Avatar
          size="xl"
          name={`${authQuery.firstName} ${authQuery.lastName}`}
          src={authQuery.image}
        />
        <Heading mt={4} mb={2}>
          {authQuery.firstName} {authQuery.lastName}
        </Heading>
        <Button colorScheme="blue" rightIcon={<EditIcon />} mt={2}>
          Edit Info
        </Button>
      </Flex>
      <Divider my={6} />
      <Stack spacing={4}>
        <HStack>
          <Text fontWeight="bold">First Name:</Text>
          <Text>{authQuery.firstName}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Last Name:</Text>
          <Text>{authQuery.lastName}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Email:</Text>
          <Text>{authQuery.email}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Phone Number:</Text>
          <Text>{authQuery.phone}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Gender:</Text>
          <Text>
            {authQuery.gender !== "not_specified"
              ? authQuery.gender
              : "Not Specified"}
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ProfileUserInfoPage;
