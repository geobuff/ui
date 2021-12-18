import React, { FC } from "react";
import { Flex, Divider, Alert, AlertIcon } from "@chakra-ui/react";

import HeroHeader from "../HeroHeader";

import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer";
import UserProfileAchievementsContainer from "../../containers/UserProfileAchievementsContainer";
import { User } from "../../types/user";
import UserProfileSummaryContainer from "../../containers/UserProfileSummaryContainer";

const divider = <Divider borderColor="transparent" my={3} />;

interface Props {
  user?: User;
  isCurrentUser?: boolean;
  error?: string;
}

const UserProfile: FC<Props> = ({
  user = null,
  isCurrentUser = false,
  error = "",
}) => (
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
      {error ? (
        <Alert status="error" borderRadius={6}>
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <>
          <UserProfileSummaryContainer
            isCurrentUser={isCurrentUser}
            user={user}
          />
          {divider}
          <UserProfileAchievementsContainer user={user} />
          {divider}
          <UserProfileLeaderboardEntriesContainer userId={user?.id} />
        </>
      )}
    </Flex>
  </>
);

export default UserProfile;
