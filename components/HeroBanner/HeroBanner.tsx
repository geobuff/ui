import React, { FC, useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import HeroBannerText from "./HeroBannerText";
import ClientOnly from "../ClientOnly";

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
  imageUrl?: string;
}

const HeroBanner: FC<Props> = ({
  title = "Get Your Geo Flex On",
  textColor = "white",
  backgroundColor = "linear-gradient(90deg, #27AE60 0%, #219250 100%)",
  imageUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/headers/world-map.svg`,
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
            : "/create/community-quizzes",
          value: "create a community quiz to share with your peers",
        },
        { link: "/merch", value: "cop an item from our winter collection" },
        {
          link: "/play/map-games",
          value: "play one of our interactive map games",
        },
        {
          link: "/play/flag-games",
          value: "play one of our drag and drop flag games",
        },
        {
          link: "/play/daily-trivia",
          value: "test yourself with our auto-generated daily trivia",
        },
        {
          link: "/resources",
          value: "use our collection of resources in your own project",
        },
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
      position="relative"
      background={backgroundColor}
      height={["260px", "300px", "420px"]}
      width="100%"
    >
      <Flex
        position="absolute"
        width="100%"
        height="100%"
        justifyContent="center"
      >
        <Flex direction="column" justifyContent="center">
          <Image
            src={imageUrl}
            alt="World map background"
            height={420}
            width={1100}
            className="fade-in"
            priority
          />
        </Flex>
      </Flex>
      <Flex
        position="absolute"
        width="100%"
        justifyContent="center"
        direction="column"
        padding={[3, 6, 12]}
        height="100%"
        textAlign="center"
      >
        <Heading
          as="h1"
          color={textColor}
          fontSize={["42px", "42px", "56px"]}
          fontWeight="black"
          lineHeight={{ base: "1.1", md: "1" }}
        >
          {title}
        </Heading>

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
            <HeroBannerText
              isLoading={isSessionLoading}
              href={actions[index]?.link}
              text={actions[index]?.value}
            />
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default HeroBanner;
