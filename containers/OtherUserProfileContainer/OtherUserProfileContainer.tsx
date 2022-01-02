import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import UserProfile from "../../components/UserProfile";
import { User } from "../../types/user";

export interface Props {
  userId: number;
}

const OtherUserProfileContainer: FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get(`/users/${userId}`)
      .then((response) => {
        if (response.status === 204) {
          setError(`User with id ${userId} not found.`);
        } else {
          setUser(response.data);
        }
      })
      .catch(() =>
        setError(`Error fetching user with id ${userId}. Please try again.`)
      )
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  return <UserProfile user={user} error={error} />;
};

export default OtherUserProfileContainer;
