import React, { FC } from "react";
import flag from "country-code-emoji";

import {
  Box,
  Heading,
  Flex,
  Text,
  Spacer,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";

import { getFlagUrl } from "@geobuff/flags";

import Card from "../Card";

import UpdateUserFormContainer from "../../containers/UpdaterUserFormContainer";

import useCountries from "../../hooks/useCountries";
import { getLevel, getLevelCompletion } from "../../helpers/gamification";
import UpdateAvatarFormContainer from "../../containers/UpdateAvatarFormContainer";
import CustomFlag from "../CustomFlag";
import Twemoji from "../Twemoji";
import FlagFallback from "../ResultsListItem/FlagFallback";
import ProfileUserAvatar from "../ProfileUserAvatar";
import UserProfileSummaryMenu from "./UserProfileSummaryMenu";

interface Props {
  username?: string;
  email?: string;
  countryCode?: string;
  xp?: number;
  avatarName?: string;
  avatarPrimaryImageUrl?: string;
  avatarSecondaryImageUrl?: string;
}

const UserProfileSummary: FC<Props> = ({
  username = "",
  email = "",
  countryCode = "",
  xp = 0,
  avatarName = "",
  avatarPrimaryImageUrl = "",
  avatarSecondaryImageUrl = "",
}) => {
  const {
    isOpen: isUserModalOpen,
    onOpen: onUserModalOpen,
    onClose: onUserModalClose,
  } = useDisclosure();

  const {
    isOpen: isAvatarModalOpen,
    onOpen: onAvatarModalOpen,
    onClose: onAvatarModalClose,
  } = useDisclosure();

  const { countries } = useCountries();
  const level = getLevel(xp);

  const downloadData = [["email"], [email]];

  const matchedCountry = countries?.find(({ value }) => value === countryCode)
    ?.label;

  const getFlag = (): React.ReactNode => {
    if (!countryCode) {
      return (
        <Box marginY="4px">
          <FlagFallback />
        </Box>
      );
    }

    if (countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG) {
      return (
        <CustomFlag
          url={getFlagUrl(countryCode)}
          boxSizing="border-box"
          border="2px solid #dae2ea"
        />
      );
    }

    return <Twemoji emoji={flag(countryCode)} />;
  };

  return (
    <>
      <Card>
        <Flex justifyContent="flex-end" width="100%">
          <UserProfileSummaryMenu
            onUserModalOpen={onUserModalOpen}
            downloadData={downloadData}
          />
        </Flex>
        <Box mb={6}>
          <Box textAlign="center">
            <ProfileUserAvatar
              marginTop="-122px"
              primaryImageUrl={avatarPrimaryImageUrl}
              secondaryImageUrl={avatarSecondaryImageUrl}
              name={avatarName}
              onClick={onAvatarModalOpen}
            />
            <Heading fontSize="32px">{username}</Heading>
            <Text color="gray.500" fontWeight={600} marginY={1}>
              {email}
            </Text>
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
              marginY={2}
            >
              <Flex direction="column" justifyContent="center" mr={2}>
                {getFlag()}
              </Flex>

              <Text color="gray.500" fontWeight={600}>
                {countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG
                  ? "GeoBuff HQ"
                  : matchedCountry}
              </Text>
            </Flex>

            <Flex marginBottom={3} marginX={6}>
              <Text fontWeight="bold">{level}</Text>
              <Spacer />
              <Text fontWeight="bold">{level + 1}</Text>
            </Flex>
            <Progress
              size="lg"
              value={getLevelCompletion(xp)}
              colorScheme="blue"
              marginX={6}
            />
          </Box>
        </Box>
      </Card>
      <UpdateAvatarFormContainer
        isOpen={isAvatarModalOpen}
        onClose={onAvatarModalClose}
      />
      <UpdateUserFormContainer
        isOpen={isUserModalOpen}
        onClose={onUserModalClose}
      />
    </>
  );
};

export default UserProfileSummary;
