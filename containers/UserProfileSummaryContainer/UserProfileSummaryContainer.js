import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import useCountries from "../../hooks/UseCountries";
import UserProfileSummary from "../../components/UserProfileSummary";

const UserProfileSummaryContainer = ({ user }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState();
  const { allCountries, isPending } = useCountries();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      setToken(token);
    });
  }, [isAuthenticated]);

  const submitCountry = (code) => {
    const update = {
      ...user,
      countryCode: code,
    };

    const params = {
      method: "PUT",
      body: JSON.stringify(update),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, params)
      .then((response) => response.json())
      .then(() => {
        setUpdated(true);
      });
  };

  if (isPending) {
    return <Text>Loading summary...</Text>;
  }

  return (
    <UserProfileSummary
      user={user}
      countries={allCountries}
      submitCountry={submitCountry}
      updated={updated}
      setUpdated={setUpdated}
    />
  );
};

UserProfileSummaryContainer.propTypes = {
  user: PropTypes.object,
};

export default UserProfileSummaryContainer;
