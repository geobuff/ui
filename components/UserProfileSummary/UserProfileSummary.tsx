import React, { FC } from "react";
import { getFlagUrl } from "@geobuff/flags";
import { DateTime } from "luxon";
import flag from "country-code-emoji";

import {
  Box,
  Heading,
  Flex,
  Text,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";

import Card from "../Card";
import UpdateUserFormContainer from "../../containers/UpdaterUserFormContainer";
import useCountries from "../../hooks/useCountries";
import UpdateAvatarFormContainer from "../../containers/UpdateAvatarFormContainer";
import CustomFlag from "../CustomFlag";
import Twemoji from "../Twemoji";
import FlagFallback from "../ResultsListItem/FlagFallback";
import ProfileUserAvatar from "../ProfileUserAvatar";
import UserProfileSummaryMenu from "./UserProfileSummaryMenu";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

const geocoinExplainerText = (
  <Box padding={2}>
    <Text>
      {`GeoCoin is our in-game currency that you earn each time you score
      greater than zero on a quiz. The amount of coins you earn scales based
      on how well you perform.`}
    </Text>
  </Box>
);

interface Props {
  isCurrentUser?: boolean;
  username?: string;
  email?: string;
  countryCode?: string;
  xp?: number;
  joined?: string;
  avatarName?: string;
  avatarPrimaryImageUrl?: string;
  avatarSecondaryImageUrl?: string;
}

const UserProfileSummary: FC<Props> = ({
  isCurrentUser = false,
  username = "",
  email = "",
  countryCode = "",
  xp = 0,
  joined = "",
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

  const downloadData = isAppMobile ? [] : [["email"], [email]];

  const matchedCountry = countries?.find(({ value }) => value === countryCode)
    ?.label;

  const getFlagNode = (): React.ReactNode => {
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

  const flagNode = getFlagNode();

  return (
    <>
      <Card>
        {isCurrentUser && (
          <Flex justifyContent="flex-end" width="100%">
            <UserProfileSummaryMenu
              onUserModalOpen={onUserModalOpen}
              downloadData={downloadData}
            />
          </Flex>
        )}
        <Box mb={6}>
          <Box textAlign="center">
            <ProfileUserAvatar
              marginTop="-122px"
              primaryImageUrl={avatarPrimaryImageUrl}
              secondaryImageUrl={avatarSecondaryImageUrl}
              name={avatarName}
              onClick={isCurrentUser ? onAvatarModalOpen : undefined}
              isClickable={isCurrentUser}
            />
            <Heading fontSize="32px">{username}</Heading>
            {isCurrentUser && (
              <Text color="gray.500" fontWeight={600} marginY={1}>
                {email}
              </Text>
            )}
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
              marginY={2}
            >
              <Flex mr={isCurrentUser && 2}>
                <Flex direction="column" justifyContent="center" mr={2}>
                  {flagNode}
                </Flex>
                <Text color="gray.500" fontWeight={600}>
                  {countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG
                    ? "GeoBuff HQ"
                    : matchedCountry}
                </Text>
              </Flex>
              {isCurrentUser && (
                <Tooltip label={geocoinExplainerText}>
                  <Flex justifyContent="center" cursor="pointer">
                    <Twemoji emoji="🪙" mr={1} />
                    <Text color="gray.500" fontWeight={600}>
                      {xp}
                    </Text>
                  </Flex>
                </Tooltip>
              )}
            </Flex>
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
              marginY={2}
            >
              <Text
                color="gray.500"
                fontWeight={600}
              >{`Member since ${DateTime.fromISO(joined).toLocaleString(
                DateTime.DATE_MED
              )}`}</Text>
            </Flex>
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
