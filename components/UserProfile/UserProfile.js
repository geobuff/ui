import React from "react";
import PropTypes from "prop-types";
import { Flex, Divider } from "@chakra-ui/react";

import HeroHeader from "../HeroHeader";

import UserProfileScoresContainer from "../../containers/UserProfileScoresContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer";
import UserProfileSummaryContainer from "../../containers/UserProfileSummaryContainer";
import UserProfileAchievementsContainer from "../../containers/UserProfileAchievementsContainer";

const divider = <Divider borderColor="transparent" my={3} />;

const UserProfile = ({ user }) => (
  <>
    <HeroHeader height={{ base: "200px", md: "250px" }} />

    <Flex
      direction="column"
      borderRadius={12}
      p={5}
      maxWidth={{ base: "100%", md: "50%" }}
      marginX={{ base: 2, md: "auto" }}
      marginTop={-100}
    >
      <UserProfileSummaryContainer />
      {divider}
      <UserProfileAchievementsContainer user={user} />
      {divider}
      <UserProfileLeaderboardEntriesContainer userId={user?.id} />
      {divider}
      <UserProfileScoresContainer userId={user?.id} />
    </Flex>
  </>
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

UserProfile.defaultProps = {
  user: null,
};

export default UserProfile;
