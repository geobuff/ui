import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const NEXT_ACTION_DELAY = 10000;
const FADE_OUT_DELAY = 1000;

interface SubHeaderAction {
  link: string;
  value: string;
}

export interface Props {
  title?: string;
  textColor?: string;
  backgroundColor?: string;
  backgroundImageUrl?: string;
}

const HeroBanner: FC<Props> = ({
  title = "Get Your Geo Flex On",
  textColor = "white",
  backgroundColor = "linear-gradient(90deg, #27AE60 0%, #219250 100%)",
  backgroundImageUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/headers/world-map.svg`,
}) => {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";

  const [actions, setActions] = useState<SubHeaderAction[]>([]);
  const [index, setIndex] = useState(0);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    if (!isSessionLoading) {
      const actions = [
        {
          link: "/leaderboard",
          value: "compete with players from all over the globe!",
        },
        {
          link: session?.user
            ? "/community-quiz/create"
            : "/community-quiz/about",
          value: "build a community quiz to share with your peers",
        },
        { link: "/merch", value: "cop an item from our winter collection" },
      ];

      setActions(actions);
      setIndex(Math.floor(Math.random() * actions.length));
    }
  }, [session, isSessionLoading]);

  const delayedSetFadeOut = () =>
    setTimeout(() => {
      setShouldFadeOut(true);
    }, NEXT_ACTION_DELAY);

  useEffect(() => {
    delayedSetFadeOut();
  }, []);

  useEffect(() => {
    delayedSetFadeOut();
  }, [index]);

  useEffect(() => {
    if (actions.length > 0 && shouldFadeOut) {
      setTimeout(() => {
        setIndex(index === actions.length - 1 ? 0 : index + 1);
        setShouldFadeOut(false);
      }, FADE_OUT_DELAY);
    }
  }, [shouldFadeOut]);

  return (
    <Box
      role="banner"
      background={backgroundColor}
      height={["260px", "300px", "420px"]}
      width="100%"
    >
      <Box
        height="100%"
        background={`url(${backgroundImageUrl})`}
        backgroundRepeat="no-repeat"
        backgroundSize={{ base: "600px 300px", md: "1200px 475px" }}
        backgroundPosition="center top 2px"
        className="fade-in"
      >
        <Flex
          direction="column"
          padding={[3, 6, 12]}
          height="100%"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text
            color={textColor}
            fontSize={["42px", "42px", "56px"]}
            fontWeight="black"
            lineHeight={{ base: "1.1", md: "1" }}
          >
            {title}
          </Text>

          <Box
            marginY={5}
            marginX="auto"
            maxWidth={{ base: "340px", sm: "400px", md: "450px" }}
            className={shouldFadeOut ? "fade-out" : "fade-in"}
          >
            <Text
              color={textColor}
              fontSize={["18px", "18px", "24px"]}
              fontWeight="medium"
            >
              {"Create an account and"}{" "}
              {isSessionLoading ? (
                <Skeleton
                  height={{ base: "20px", md: "25px" }}
                  width={{ base: "240px", md: "350px" }}
                  mt={1}
                />
              ) : (
                <Link href={actions[index]?.link ?? ""}>
                  <ChakraLink textDecoration="underline">
                    {actions[index]?.value}
                  </ChakraLink>
                </Link>
              )}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HeroBanner;
