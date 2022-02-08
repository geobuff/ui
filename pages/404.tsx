import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import MainView from "../components/MainView";

const Custom404: FC = () => {
  return (
    <MainView backgroundColor="#276F86" hasFooter={false} overflowX="hidden">
      <Flex
        alignItems="center"
        justifyContent="center"
        flex={1}
        height="100%"
        width="100%"
        direction="column"
        maxWidth={1400}
        marginX="auto"
      >
        <Box textAlign="center" color="white">
          <Heading
            as="h1"
            fontWeight="black"
            fontSize="250px"
            transition="200ms ease-in-out"
            cursor="grab"
            lineHeight="0.99"
          >
            {"404"}
          </Heading>
          <Divider
            borderColor="white"
            opacity={1}
            borderWidth={3}
            marginY={6}
          />
          <Heading as="h2" fontSize="5xl" fontWeight="extrabold">
            {"Page Not Found"}
          </Heading>
          <Divider
            borderColor="white"
            opacity={1}
            borderWidth={3}
            marginY={6}
          />
          <Text marginBottom={6} fontWeight="medium">
            {"We're sorry, but the page you're looking for does not exist."}
          </Text>
          <Link href="/">
            <Button
              variant="outline"
              _hover={{ color: "black", backgroundColor: "white" }}
            >
              {"Return home"}
            </Button>
          </Link>
        </Box>
      </Flex>
    </MainView>
  );
};

export default Custom404;
