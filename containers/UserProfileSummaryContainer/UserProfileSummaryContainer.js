import React, { useEffect, useState } from "react";

import UserProfileSummary from "../../components/UserProfileSummary";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserProfileSummaryContainer = () => {
  const { user } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(true);

  // Fix issue where user does not load in time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  });

  return <UserProfileSummary isLoading={isLoading} {...user} />;
};

export default UserProfileSummaryContainer;
