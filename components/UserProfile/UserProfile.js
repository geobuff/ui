import React from "react";
import { Box, Divider } from "@chakra-ui/core";
import UserProfileSummaryContainer from "../UserProfileSummaryContainer";

const UserProfile = () => (
  <Box m={5}>
    <UserProfileSummaryContainer />
    <Divider my={3} />
  </Box>
);

export default UserProfile;
