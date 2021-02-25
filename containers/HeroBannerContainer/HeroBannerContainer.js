import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

import HeroBanner from "../../components/HeroBanner";

const HeroBannerContainer = () => {
  const [username, setUsername] = useState();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }).then((token) => {
        const decoded = jwt_decode(token);
        const username = decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY];
        setUsername(username);
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return <HeroBanner username={username} />;
};

HeroBannerContainer.propTypes = {};
HeroBannerContainer.defaultProps = {};

export default HeroBannerContainer;
