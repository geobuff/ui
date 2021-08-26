import React, { FC } from "react";

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

import LoadingPlaceholder from "../../placeholders/UserProfileSummaryPlaceholder";

interface Props {
  isLoading?: boolean;
  onClickUpgrade?: any;
  onClickManage?: any;
  username?: string;
  email?: string;
  countryCode?: string;
  xp?: number;
  isPremium?: boolean;
  avatarName?: string;
  avatarImageUrl?: string;
  avatarBackground?: string;
  avatarBorder?: string;
  error?: string;
}

const UserProfileSummary: FC<Props> = ({
  isLoading = false,
  onClickUpgrade = () => {},
  onClickManage = () => {},
  username = "",
  email = "",
  countryCode = "",
  xp = 0,
  isPremium = false,
  avatarName = "",
  avatarImageUrl = "",
  avatarBackground = "",
  avatarBorder = "",
  error = "",
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
            <IconButton
              aria-label="pencil"
              backgroundColor="transparent"
              onClick={onOpen}
            >
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
            <Flex
              alignItems="center"
              borderRadius={"100%"}
              backgroundColor={avatarBackground}
              borderWidth={10}
              border="solid 5px"
              borderColor={avatarBorder}
              padding={3}
              height="130px"
              width="130px"
              marginTop="-122px"
              marginBottom={2}
              marginX="auto"
            >
              <Image
                src={avatarImageUrl}
                alt={avatarName}
                height="70px"
                width="70px"
                marginX="auto"
              />
            </Flex>
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
            <Flex
              marginTop={4}
              marginBottom={0}
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Checkbox size="lg" isChecked={isPremium} isDisabled>
                {"Premium"}
              </Checkbox>
              {!isPremium ? (
                <Button
                  backgroundColor="purple.700"
                  color="white"
                  onClick={onClickUpgrade}
                  marginLeft={5}
                  _hover={{ backgroundColor: "purple.800" }}
                  disabled={process.env.NODE_ENV === "production"}
                >
                  {"Upgrade"}
                </Button>
              ) : (
                <Button marginLeft={5} onClick={onClickManage}>
                  {"Manage"}
                </Button>
              )}
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
      <UpdateUserFormContainer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UserProfileSummary;
