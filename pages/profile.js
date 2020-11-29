import React, { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        });
        console.log(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  return <div>Profile works!</div>;
};

export default withAuthenticationRequired(Profile, {
  // eslint-disable-next-line
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
