import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// import { useRouter } from "next/router";

import { Box, Button, SkeletonCircle } from "@chakra-ui/react";
import UserAvatarMenu from "../../components/UserAvatarMenu";

const UserAvatarMenuContainer = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    // logout,
    user,
  } = useAuth0();

  useEffect(() => {
    setIsUserLoading(isLoading);
  }, [isLoading]);

  console.log(user, "isLoading");

  if (isUserLoading) {
    return (
      <Box>
        <SkeletonCircle height="32px" width="32px" />
      </Box>
    );
  }

  if (user && isAuthenticated) {
    return <UserAvatarMenu user={user} />;
  }

  return <Button onClick={loginWithRedirect}>{"Login"}</Button>;
};

UserAvatarMenuContainer.propTypes = {};
UserAvatarMenuContainer.defaultProps = {};

export default UserAvatarMenuContainer;
