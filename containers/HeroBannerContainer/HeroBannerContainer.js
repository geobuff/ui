// import React, { useEffect, useState } from "react";
import React, { useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import jwt_decode from "jwt-decode";

import useCurrentUser from "../../hooks/UseCurrentUser";

import HeroBanner from "../../components/HeroBanner";

const HeroBannerContainer = () => {
  const { user } = useCurrentUser();

  return <HeroBanner username={user?.username} />;
};

HeroBannerContainer.propTypes = {};
HeroBannerContainer.defaultProps = {};

export default HeroBannerContainer;
