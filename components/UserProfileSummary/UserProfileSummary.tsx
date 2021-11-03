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
  Tooltip,
} from "@chakra-ui/react";

import { getFlagUrl } from "@geobuff/flags";
import { CSVLink } from "react-csv";

import Card from "../Card";
import Image from "../Image";

import UpdateUserFormContainer from "../../containers/UpdaterUserFormContainer";

import SolidPencil from "../../Icons/SolidPencil";

import useCountries from "../../hooks/useCountries";
import { getLevel, getLevelCompletion } from "../../helpers/gamification";
import SaveAlt from "../../Icons/SaveAlt";
import UpdateAvatarFormContainer from "../../containers/UpdateAvatarFormContainer";

interface Props {
  username?: string;
  email?: string;
  countryCode?: string;
  xp?: number;
  avatarName?: string;
  avatarImageUrl?: string;
  avatarBackground?: string;
  avatarBorder?: string;
}

const UserProfileSummary: FC<Props> = ({
  username = "",
  email = "",
  countryCode = "",
  xp = 0,
  avatarName = "",
  avatarImageUrl = "",
  avatarBackground = "",
  avatarBorder = "",
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

  const csvData = [["email"], [email]];

  const matchedCountry = countries?.find(({ value }) => value === countryCode)
    ?.label;

  return (
    <>
      <Card>
        <Box width="100%">
          <Flex justifyContent="space-between">
            <CSVLink data={csvData} filename={"data.csv"}>
              <Tooltip
                label={`Click here to download personal information collected by GeoBuff. For more information, see our privacy policy.`}
                placement="top"
              >
                <IconButton aria-label="download" backgroundColor="transparent">
                  <SaveAlt
                    color="gray.600"
                    marginLeft="4px"
                    marginTop="4px"
                    height="22px"
                    width="22px"
                  />
                </IconButton>
              </Tooltip>
            </CSVLink>
            <IconButton
              aria-label="pencil"
              backgroundColor="transparent"
              onClick={onUserModalOpen}
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
              cursor="pointer"
              onClick={onAvatarModalOpen}
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
