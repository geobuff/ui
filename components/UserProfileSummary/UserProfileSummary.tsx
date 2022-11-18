import React, { FC, useContext, useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import flag from "country-code-emoji";
import { DateTime } from "luxon";
import { signOut, useSession } from "next-auth/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import UpdateAvatarFormContainer from "../../containers/UpdateAvatarFormContainer";
import UpdateUserFormContainer from "../../containers/UpdaterUserFormContainer";

import useCountries from "../../hooks/useCountries";

import axiosClient from "../../axios";
import { AuthUser } from "../../types/auth-user";
import AdminFlag from "../AdminFlag";
import Card from "../Card";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import ProfileUserAvatar from "../ProfileUserAvatar";
import FlagFallback from "../ResultsListItem/FlagFallback";
import Twemoji from "../Twemoji";
import UserProfileSummaryMenu from "./UserProfileSummaryMenu";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

interface Props {
  isCurrentUser?: boolean;
  username?: string;
  email?: string;
  countryCode?: string;
  xp?: number;
  joined?: string;
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
  avatarPrimaryImageUrl = "",
  avatarSecondaryImageUrl = "",
}) => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const { t } = useContext(LanguageContext);

  const [isDeleteAccountSubmitting, setIsDeleteAccountSubmitting] =
    useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState("");

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

  const {
    isOpen: isDeleteAccountModalOpen,
    onOpen: onDeleteAccountModalOpen,
    onClose: onDeleteAccountModalClose,
  } = useDisclosure();

  const handleDeleteAccountSubmit = (): void => {
    setIsDeleteAccountSubmitting(true);
    setDeleteAccountError("");

    axiosClient
      .delete(`/users/${user?.id}`, session?.authConfig)
      .then(() => {
        onDeleteAccountModalClose();
        signOut();
      })
      .catch((error) => setDeleteAccountError(error.response.data))
      .finally(() => setIsDeleteAccountSubmitting(false));
  };

  const { countries } = useCountries();

  const downloadData = isAppMobile ? [] : [["email"], [email]];

  const matchedCountry = countries?.find(
    ({ value }) => value === countryCode
  )?.label;

  const geocoinExplainerText = (
    <Box padding={2}>
      <Text>{t.global.geoCoinExplainer}</Text>
    </Box>
  );

  const getFlagNode = (): React.ReactNode => {
    if (!countryCode) {
      return (
        <Box marginY="4px">
          <FlagFallback />
        </Box>
      );
    }

    if (countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG_CODE) {
      return <AdminFlag />;
    }

    return <Twemoji emoji={flag(countryCode)} />;
  };

  const flagNode = getFlagNode();

  return (
    <>
      <Card padding={3}>
        {isCurrentUser && (
          <Flex justifyContent="flex-end" width="100%">
            <UserProfileSummaryMenu
              downloadData={downloadData}
              onUserModalOpen={onUserModalOpen}
              onAvatarModalOpen={onAvatarModalOpen}
              onDeleteAccountModalOpen={onDeleteAccountModalOpen}
            />
          </Flex>
        )}
        <Box mb={6}>
          <Box textAlign="center">
            <ProfileUserAvatar
              marginTop="-122px"
              primaryImageUrl={avatarPrimaryImageUrl}
              secondaryImageUrl={avatarSecondaryImageUrl}
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
                  {countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG_CODE
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
              <Text color="gray.500" fontWeight={600}>
                {`${t.userProfileSummary.memberSince} ${DateTime.fromISO(
                  joined
                ).toLocaleString(DateTime.DATE_MED)}`}
              </Text>
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
      <DeleteModal
        header="Delete Account"
        message="Are you sure you want to delete your account? You will not be able to recover any of the data once this action is complete."
        isOpen={isDeleteAccountModalOpen}
        onClose={onDeleteAccountModalClose}
        onSubmit={handleDeleteAccountSubmit}
        isSubmitting={isDeleteAccountSubmitting}
        error={deleteAccountError}
      />
    </>
  );
};

export default UserProfileSummary;
