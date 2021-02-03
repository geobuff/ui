import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import UserProfileContainer from "../containers/UserProfileContainer";
import LoginRedirect from "../components/LoginRedirect";

const Profile = () => <UserProfileContainer />;

export default withAuthenticationRequired(Profile, {
  // eslint-disable-next-line
  onRedirecting: () => <LoginRedirect />,
});
