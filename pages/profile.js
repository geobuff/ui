import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import UserProfile from "../components/UserProfile";
import LoginRedirect from "../components/LoginRedirect";

const Profile = () => <UserProfile />;

export default withAuthenticationRequired(Profile, {
  // eslint-disable-next-line
  onRedirecting: () => <LoginRedirect />,
});
