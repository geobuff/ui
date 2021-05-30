import React from "react";

import UserProfileSummary from "../../components/UserProfileSummary";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserProfileSummaryContainer = () => {
  const { user } = useCurrentUser();

  return <UserProfileSummary user={user} />;
};

export default UserProfileSummaryContainer;
