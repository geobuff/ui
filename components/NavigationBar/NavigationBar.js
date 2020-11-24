import React from "react";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import Twemoji from "../Twemoji";
import { useAuth0 } from "@auth0/auth0-react";

const NavigationBar = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  return (
    <Box
      m={0}
      py={1}
      px={5}
      backgroundColor="white"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Text ml={2} fontSize={[22, 26, 26]} fontWeight="bold">
            <Twemoji
              emoji="🌏"
              height={[6, 7, 7]}
              width={[6, 7, 7]}
              pt={["4px", "5px", "5px"]}
              mr={2}
            />
            {"Geobuff"}
          </Text>
        </Link>

        {!isLoading &&
          (isAuthenticated ? (
            <Button
              onClick={() =>
                logout({ returnTo: process.env.NEXT_PUBLIC_REDIRECT_URI })
              }
            >
              Log out
            </Button>
          ) : (
            <Button onClick={loginWithRedirect}>Log in</Button>
          ))}
      </Flex>
    </Box>
  );
};

export default NavigationBar;
