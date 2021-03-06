import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import LoginRedirect from "../components/LoginRedirect";
import UserProfileContainer from "../containers/UserProfileContainer";

const Profile = () => <UserProfileContainer />;

export default withAuthenticationRequired(Profile, {
  // eslint-disable-next-line
  onRedirecting: () => <LoginRedirect />,
});
