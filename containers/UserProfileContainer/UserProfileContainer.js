import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

import UserProfile from "../../components/UserProfile/UserProfile";

const UserProfileContainer = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      setToken(token);
      const decoded = jwt_decode(token);
      setId(decoded[process.env.NEXT_PUBLIC_AUTH0_USERID_KEY]);
      setUsername(decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY]);
      setLoading(false);
    });
  }, [getAccessTokenSilently]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <UserProfile
      imageUrl={user?.picture}
      token={token}
      id={id}
      username={username}
      email={user.email}
    />
  );
};

export default UserProfileContainer;
