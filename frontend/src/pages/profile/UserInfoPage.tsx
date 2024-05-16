import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import useAuthQueryStore from "../../store/authStore";

const UserInfoPage = () => {
  const { authQuery, setAuthQuery } = useAuthQueryStore();
  return (
    <>
      <Flex flexDirection="column" align="center">
        <Avatar
          size="xl"
          name={`${authQuery.firstName} ${authQuery.lastName}`}
          src={authQuery.image}
        />
        <Heading mt={4} mb={2}>
          {authQuery.firstName} {authQuery.lastName}
        </Heading>
        {/* <Text>{authQuery.email}</Text>
        <Text>{authQuery.phone}</Text> */}
      </Flex>
      <Divider my={6} />
      <Stack spacing={4}>
        <HStack>
          <Text fontWeight="bold">Email:</Text>
          <Text>{authQuery.email}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Phone Number:</Text>
          <Text>{authQuery.phone}</Text>
        </HStack>
      </Stack>
    </>
  );
};

export default UserInfoPage;
