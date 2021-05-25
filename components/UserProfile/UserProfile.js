import React from "react";
import PropTypes from "prop-types";
import { Flex, Divider } from "@chakra-ui/react";

import UserProfileScoresContainer from "../../containers/UserProfileScoresContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer";
import UserProfileSummaryContainer from "../../containers/UserProfileSummaryContainer";
import UserProfileAchievementsContainer from "../../containers/UserProfileAchievementsContainer";

const divider = <Divider my={3} />;

const UserProfile = ({ user }) => (
  <Flex
    direction="column"
    borderRadius={12}
    p={5}
    background="#FFFFFF"
    maxWidth={{ base: "100%", md: "50%" }}
    marginX={{ base: 2, md: "auto" }}
    marginTop={4}
  >
    <UserProfileSummaryContainer />
    {divider}
    <UserProfileAchievementsContainer user={user} />
    {divider}
    <UserProfileLeaderboardEntriesContainer userId={user.id} />
    {divider}
    <UserProfileScoresContainer userId={user.id} />
  </Flex>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
};

export default UserProfile;
