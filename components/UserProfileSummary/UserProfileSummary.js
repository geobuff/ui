import React from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Box,
  Heading,
  Flex,
  IconButton,
  Text,
  Spacer,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";

import { getFlagUrl } from "@geobuff/flags";

import Card from "../Card";
import ErrorAlertBanner from "../ErrorAlertBanner";
import Image from "../Image";

import UpdateUserFormContainer from "../../containers/UpdaterUserFormContainer";

import SolidPencil from "../../Icons/SolidPencil";

import useCountries from "../../hooks/useCountries";
import { getLevel, getLevelCompletion } from "../../helpers/gamification";

const UserProfileSummary = ({ user, error }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { countries } = useCountries();
  const level = getLevel(user.xp);

  const matchedCountry = countries?.find(
    ({ value }) => value === user.countryCode
  )?.label;

  return (
    <>
      <Card>
        <Box width="100%">
          <Flex justifyContent="flex-end">
            <IconButton backgroundColor="transparent" onClick={onOpen}>
              <SolidPencil
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
            <Avatar
              height="130px"
              width="130px"
              src={user?.picture}
              name={user.username}
              marginTop="-112px"
              marginBottom={6}
            />

            <Heading fontSize="32px">{user.username}</Heading>
            <Text color="gray.500" fontWeight={600} marginY={1}>
              {user.email}
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
                src={getFlagUrl(user.countryCode)}
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
              value={getLevelCompletion(user.xp)}
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
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    isPremium: PropTypes.bool,
    picture: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
  createCheckoutSession: PropTypes.func,
  manageSubscription: PropTypes.func,
};

UserProfileSummary.defaultProps = {
  user: {},
  onSubmit: () => {},
  isSubmitting: false,
  error: "",
  createCheckoutSession: () => {},
  manageSubscription: () => {},
};

export default UserProfileSummary;
