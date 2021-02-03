import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { fetcher } from "../../helpers/fetcher";
import jwt_decode from "jwt-decode";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserProfileContainer = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [id, setId] = useState();
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      setToken(token);
      const decoded = jwt_decode(token);
      const username = decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY];
      setUsername(username);
      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${username}`).then(
        (id) => {
          setId(id);
          fetcher(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`).then(
            (quizzes) => {
              setQuizzes(quizzes);
              setLoading(false);
            }
          );
        }
      );
    });
  }, [getAccessTokenSilently]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <UserProfile
      token={token}
      id={id}
      username={username}
      email={user.email}
      quizzes={quizzes}
    />
  );
};

export default UserProfileContainer;
