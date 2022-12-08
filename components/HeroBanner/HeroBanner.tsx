import React, { FC, useContext, useEffect, useState } from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import HeroBannerText from "./HeroBannerText";

const NEXT_ACTION_DELAY = 10000;
const FADE_OUT_DELAY = 1000;

interface SubHeaderAction {
  link: string;
  value: string;
}

export interface Props {
  textColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
}

const HeroBanner: FC<Props> = ({
  textColor = "white",
  backgroundColor = "linear-gradient(90deg, #27AE60 0%, #219250 100%)",
  imageUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/headers/world-map.svg`,
}) => {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";

  const { language, t } = useContext(LanguageContext);

  const [actions, setActions] = useState<SubHeaderAction[]>([]);
  const [index, setIndex] = useState(0);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    if (!isSessionLoading) {
      const actions = [
        {
          link: "/leaderboard",
          value: t.heroBanner.actionOne,
        },
        {
          link: session?.user
            ? "/community-quiz/create"
            : "/create/community-quizzes",
          value: t.heroBanner.actionTwo,
        },
        { link: "/merch", value: t.heroBanner.actionThree },
        {
          link: "/play/map-games",
          value: t.heroBanner.actionFour,
        },
        {
          link: "/play/flag-games",
          value: t.heroBanner.actionFive,
        },
        {
          link: "/play/daily-trivia",
          value: t.heroBanner.actionSix,
        },
        {
          link: "/resources",
          value: t.heroBanner.actionSeven,
        },
      ];

      setActions(actions);
      setIndex(Math.floor(Math.random() * actions.length));
    }
  }, [session, isSessionLoading, language]);

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
          {t.heroBanner.title}
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
            {`${t.heroBanner.subtitle} `}
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
