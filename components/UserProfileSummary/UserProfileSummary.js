import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/core";

const UserProfileSummary = ({ username, email }) => (
  <Box>
    <Text>{username}</Text>
    <Text>{email}</Text>
  </Box>
);

UserProfileSummary.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
};

export default UserProfileSummary;
