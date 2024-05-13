import {
  Text,
  Flex,
  Avatar,
  Heading,
  Button,
  Divider,
  Stack,
  Badge,
  List,
  ListItem,
  UnorderedList,
  ListIcon,
  Box,
} from "@chakra-ui/react";

import React from "react";
import { MdCheckCircle } from "react-icons/md";

const UserInfoPage = () => {
  return (
    <>
      <Flex flexDirection="column" align="center">
        <Avatar size="xl" name="John Doe" src="https://bit.ly/dan-abramov" />
        <Heading mt={4} mb={2}>
          John Doe
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Regular Customer
        </Text>
        <Button mt={4} colorScheme="teal">
          Edit Profile
        </Button>
      </Flex>
      <Divider my={6} />
      <Stack spacing={4}>
        <Box>
          <Text fontWeight="bold">Membership:</Text>
          <Badge colorScheme="green">Premium</Badge>
        </Box>
        <Box>
          <Text fontWeight="bold">Membership Expiry:</Text>
          <Text>May 13, 2025</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Total Points:</Text>
          <Text>1500</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Recent Orders:</Text>
          <List spacing={3}>
            <ListItem>Order #001 - Latte, Croissant (May 12, 2024)</ListItem>
            <ListItem>
              Order #002 - Espresso, Blueberry Muffin (May 11, 2024)
            </ListItem>
            {/* Add more orders as needed */}
          </List>
        </Box>
        <Box>
          <Text fontWeight="bold">Favorite Products:</Text>
          <UnorderedList spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Latte
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Croissant
            </ListItem>
            {/* Add more favorite products as needed */}
          </UnorderedList>
        </Box>
      </Stack>
    </>
  );
};

export default UserInfoPage;
