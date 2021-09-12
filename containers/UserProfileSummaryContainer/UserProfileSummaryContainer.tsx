import React, { useEffect, useState, FC, useContext } from "react";

import UserProfileSummary from "../../components/UserProfileSummary";
import UserProfileSummaryPlaceholder from "../../placeholders/UserProfileSummaryPlaceholder";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const UserProfileSummaryContainer: FC = () => {
  const { user } = useContext(CurrentUserContext);

  const [isLoading, setIsLoading] = useState(true);

  // Fix issue where user does not load in time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  });

  if (isLoading) {
    return <UserProfileSummaryPlaceholder />;
  }

  return <UserProfileSummary {...user} />;
};

export default UserProfileSummaryContainer;
