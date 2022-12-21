import React, { FC, useContext, useEffect, useState } from "react";

import {
  HeroBanner,
  HeroBannerSubtitleAction,
} from "@geobuff/buff-ui/components";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { LanguageContext } from "../contexts/LanguageContext";

export const HeroBannerContainer: FC = () => {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";

  const { language, t } = useContext(LanguageContext);
  const [actions, setActions] = useState<HeroBannerSubtitleAction[]>([]);

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
    }
  }, [session, isSessionLoading, language, t]);

  const image = (
    <Image
      src={`${process.env.NEXT_PUBLIC_CDN_URL}/headers/world-map.svg`}
      alt="World map background"
      height={420}
      width={1100}
      className="fade-in"
      priority
    />
  );

  return (
    <HeroBanner
      image={image}
      actions={actions}
      isLoading={isSessionLoading}
      title={t.heroBanner.title}
      subtitle={t.heroBanner.subtitle}
    />
  );
};
