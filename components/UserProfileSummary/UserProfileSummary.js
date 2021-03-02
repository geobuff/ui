import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Image,
} from "@chakra-ui/react";

const UserProfileSummary = ({ imageUrl, username, email }) => (
  <Box>
    <Image
      src={imageUrl}
      alt="Auth0 profile"
      mx="auto"
      my={6}
      borderRadius={12}
    ></Image>
    <Divider />
    <FormControl my={6}>
      <FormLabel>Username</FormLabel>
      <Input variant="filled" value={username} readOnly />
    </FormControl>
    <FormControl my={6}>
      <FormLabel>Email</FormLabel>
      <Input variant="filled" type="email" value={email} readOnly />
    </FormControl>
  </Box>
);

UserProfileSummary.propTypes = {
  imageUrl: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
};

export default UserProfileSummary;
