import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import UserProfileSummary from "../UserProfileSummary/UserProfileSummary";

const UserProfileSummaryContainer = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      });
      const decoded = jwt_decode(token);
      setUsername(decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY]);
      setLoading(false);
    })();
  }, [getAccessTokenSilently]);

  if (loading) {
    return <Text>Loading summary...</Text>;
  }

  return <UserProfileSummary username={username} email={user.email} />;
};

export default UserProfileSummaryContainer;
