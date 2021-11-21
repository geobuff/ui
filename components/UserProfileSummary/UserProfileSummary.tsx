import React, { FC } from "react";
import { getFlagUrl } from "@geobuff/flags";
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
  <Text padding={2}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Text>
);

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
              <Flex mr={2}>
                <Flex direction="column" justifyContent="center" mr={2}>
                  {flagNode}
                </Flex>
                <Text color="gray.500" fontWeight={600}>
                  {countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG
                    ? "GeoBuff HQ"
                    : matchedCountry}
                </Text>
              </Flex>
              <Tooltip label={geocoinExplainerText}>
                <Flex justifyContent="center" cursor="pointer">
                  <Twemoji emoji="🪙" mr={1} />
                  <Text color="gray.500" fontWeight={600}>
                    {xp}
                  </Text>
                </Flex>
              </Tooltip>
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
