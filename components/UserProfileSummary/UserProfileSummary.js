import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getFlagUrl } from "@geobuff/flags";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Flex,
  Select,
  Button,
  useToast,
  Avatar,
} from "@chakra-ui/react";

import UserAvatar from "../UserAvatar/UserAvatar";

const UserProfileSummary = ({
  user,
  countries,
  submitCountry,
  updated,
  setUpdated,
}) => {
  const toast = useToast();
  const [countryCode, setCountryCode] = useState(user.countryCode);

  useEffect(() => {
    if (updated) {
      toast({
        position: "bottom-right",
        title: "User Updated",
        description: "Country code successfully updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setUpdated(false);
      user.countryCode = countryCode;
    }
  }, [updated]);

  return (
    <Box mb={6}>
      <Box textAlign="center">
        <Avatar
          height="60px"
          width="60px"
          src={user?.picture}
          name={user.username}
          mt={2}
          mb={6}
        />
      </Box>
      <Divider />
      <FormControl my={6}>
        <FormLabel>Username</FormLabel>
        <Input variant="filled" value={user.username} readOnly />
      </FormControl>
      <FormControl my={6}>
        <FormLabel>Email</FormLabel>
        <Input variant="filled" type="email" value={user.email} readOnly />
      </FormControl>
      <Flex>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="" disabled>
              Please select a country...
            </option>
            {countries.map((x) => (
              <option key={x.code} value={x.code}>
                {x.svgName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Box mt="auto" mx={3}>
          <UserAvatar
            borderRadius={4}
            height="40px"
            width="40px"
            imageUrl={getFlagUrl(countryCode)}
          />
        </Box>
        <Box mt="auto">
          <Button
            mx={6}
            disabled={!countryCode || countryCode === user.countryCode}
            onClick={() => submitCountry(countryCode)}
          >
            {"UPDATE"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

UserProfileSummary.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      svgName: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  submitCountry: PropTypes.func,
  updated: PropTypes.bool,
  setUpdated: PropTypes.func,
};

UserProfileSummary.defaultProps = {
  user: {},
  countries: [],
  submitCountry: () => {},
  updated: false,
  setUpdated: () => {},
};

export default UserProfileSummary;
