import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Heading,
  Flex,
  IconButton,
  Text,
  Spacer,
  Progress,
  useDisclosure,
  Checkbox,
  Button,
} from "@chakra-ui/react";

import { getFlagUrl } from "@geobuff/flags";

import Card from "../Card";
import ErrorAlertBanner from "../ErrorAlertBanner";
import Image from "../Image";

import UpdateUserFormContainer from "../../containers/UpdaterUserFormContainer";

import SolidPencil from "../../Icons/SolidPencil";

import useCountries from "../../hooks/useCountries";
import { getLevel, getLevelCompletion } from "../../helpers/gamification";

import LoadingPlaceholder from "./UserProfileSummaryPlaceholder";

const UserProfileSummary = ({
  isLoading,
  onClickUpgrade,
  onClickManage,
  username,
  email,
  countryCode,
  xp,
  isPremium,
  avatarName,
  avatarImageUrl,
  avatarBackground,
  avatarBorder,
  error,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { countries } = useCountries();
  const level = getLevel(xp);

  const matchedCountry = countries?.find(({ value }) => value === countryCode)
    ?.label;

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <>
      <Card>
        <Box width="100%">
          <Flex justifyContent="flex-end">
            <IconButton backgroundColor="transparent" onClick={onOpen}>
              <SolidPencil
                color="gray.600"
                marginLeft="4px"
                marginTop="4px"
                height="22px"
                width="22px"
              />
            </IconButton>
          </Flex>
        </Box>
        <Box mb={6}>
          <ErrorAlertBanner error={error} />
          <Box textAlign="center">
            <Box
              borderRadius={"100%"}
              backgroundColor={avatarBackground}
              borderWidth={10}
              border="solid 5px"
              borderColor={avatarBorder}
              padding={3}
              height="130px"
              width="130px"
              marginTop="-112px"
              marginBottom={6}
              marginX="auto"
            >
              <Image
                src={avatarImageUrl}
                alt={avatarName}
                height="70px"
                width="70px"
                marginX="auto"
              />
            </Box>
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
              <Image
                marginRight="8px"
                height="17px"
                width="23.5px"
                objectFit="cover"
                src={getFlagUrl(countryCode)}
                borderRadius={4}
              />
              <Text color="gray.500" fontWeight={600}>
                {matchedCountry}
              </Text>
            </Flex>
            <Box>
              <Checkbox size="lg" isChecked={isPremium} isDisabled>
                {"Premium"}
              </Checkbox>
              {!isPremium ? (
                <Button
                  backgroundColor="purple.700"
                  color="white"
                  onClick={onClickUpgrade}
                >
                  {"Upgrade"}
                </Button>
              ) : (
                <Button onClick={onClickManage}>{"Manage"}</Button>
              )}
            </Box>

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
      <UpdateUserFormContainer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

UserProfileSummary.propTypes = {
  isLoading: PropTypes.bool,
  onClickUpgrade: PropTypes.func,
  onClickManage: PropTypes.func,
  username: PropTypes.string,
  email: PropTypes.string,
  countryCode: PropTypes.string,
  xp: PropTypes.number,
  isPremium: PropTypes.bool,
  avatarName: PropTypes.string,
  avatarImageUrl: PropTypes.string,
  avatarBackground: PropTypes.string,
  avatarBorder: PropTypes.string,
  error: PropTypes.string,
};

UserProfileSummary.defaultProps = {
  isLoading: false,
  onClickUpgrade: () => {},
  onClickManage: () => {},
  username: "",
  email: "",
  countryCode: "",
  xp: 0,
  isPremium: false,
  avatarName: "",
  avatarImageUrl: "",
  avatarBackground: "",
  avatarBorder: "",
  error: "",
};

export default UserProfileSummary;
