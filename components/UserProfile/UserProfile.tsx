import React, { FC } from "react";
import { Flex, Divider } from "@chakra-ui/react";

import HeroHeader from "../HeroHeader";

import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer";
import UserProfileSummaryContainer from "../../containers/UserProfileSummaryContainer";
import UserProfileAchievementsContainer from "../../containers/UserProfileAchievementsContainer";
import { User } from "../../types/user";

const divider = <Divider borderColor="transparent" my={3} />;

interface Props {
  user?: User;
}

const UserProfile: FC<Props> = ({ user=null }) => (
  <>
    <HeroHeader height={{ base: "200px", md: "250px" }} />

    <Flex
      direction="column"
      borderRadius={12}
      p={5}
      width="100%"
      maxWidth={{ base: "100%", md: "850px" }}
      marginX={{ base: 0, md: "auto" }}
      marginTop={-100}
      justifyContent="center"
    >
      <UserProfileSummaryContainer />
      {divider}
      <UserProfileAchievementsContainer user={user} />
      {divider}
      <UserProfileLeaderboardEntriesContainer userId={user?.id} />
    </Flex>
  </>
);

export default UserProfile;
