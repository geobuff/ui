import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Image,
  Progress,
  Flex,
  Text,
  Spacer,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

const UserProfileSummary = ({
  user,
  countries,
  submitCountry,
  updated,
  setUpdated,
}) => {
  const toast = useToast();
  const [countryCode, setCountryCode] = useState(user.countryCode);
  const [countryAction, setCountryAction] = useState(
    user.countryCode ? "UPDATE" : "SAVE"
  );

  useEffect(() => {
    if (updated) {
      toast({
        title: "User Updated",
        description: "Country code successfully updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setUpdated(false);
      user.countryCode = countryCode;
      if (countryAction === "SAVE") {
        setCountryAction("UPDATE");
      }
    }
  }, [updated]);

  return (
    <Box>
      <Image
        src={user.picture}
        alt="Auth0 profile"
        mx="auto"
        my={6}
        borderRadius={12}
      ></Image>
      <Divider />
      <Box mt={6} mb={9}>
        <Flex mb={3}>
          <Text fontWeight="bold">1</Text>
          <Spacer />
          <Text fontWeight="bold">2</Text>
        </Flex>
        <Progress hasStripe value={69} colorScheme="green" />
      </Box>
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
            placeholder="Please select a country..."
          >
            {countries.map((x) => (
              <option key={x.code} value={x.code}>
                {x.svgName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Box mt="auto">
          <Button
            mx={6}
            disabled={countryCode && countryCode === user.countryCode}
            onClick={() => submitCountry(countryCode)}
          >
            {countryAction}
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

export default UserProfileSummary;
