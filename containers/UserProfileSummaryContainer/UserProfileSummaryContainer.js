import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

import useCountries from "../../hooks/UseCountries";
import UserProfileSummary from "../../components/UserProfileSummary";

const UserProfileSummaryContainer = ({ user }) => {
  const { allCountries, isPending } = useCountries();

  if (isPending) {
    return <Text>Loading summary...</Text>;
  }

  return (
    <UserProfileSummary
      user={user}
      countries={allCountries.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      )}
    />
  );
};

UserProfileSummaryContainer.propTypes = {
  user: PropTypes.object,
};

export default UserProfileSummaryContainer;
