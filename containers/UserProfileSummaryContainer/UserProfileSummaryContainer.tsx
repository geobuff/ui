import React, { FC, useEffect, useState } from "react";

import UserProfileSummary from "../../components/UserProfileSummary";

import UserProfileSummaryPlaceholder from "../../placeholders/UserProfileSummaryPlaceholder";
import { UserDto } from "../../types/user-dto";

interface Props {
  isCurrentUser?: boolean;
  user?: UserDto;
}

const UserProfileSummaryContainer: FC<Props> = ({
  isCurrentUser = false,
  user = null,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Fix issue where user does not load in time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  });

  if (isLoading) {
    return <UserProfileSummaryPlaceholder />;
  }

  return <UserProfileSummary isCurrentUser={isCurrentUser} {...user} />;
};

export default UserProfileSummaryContainer;
