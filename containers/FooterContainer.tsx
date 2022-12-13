import React, { FC, useContext } from "react";

import {
  Discord,
  Facebook,
  Footer,
  FooterVariant,
  GeoBuffLogo,
  GitHub,
  Instagram,
  Reddit,
  Twitch,
  Twitter,
  YouTube,
} from "@geobuff/buff-ui/components";

import { Flex, Link, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import { FooterPlaysContainer } from "./FooterPlaysContainer";

const socialIcons = (
  <Flex justifyContent="center" mt={{ base: 12, md: 0 }}>
    <SimpleGrid columns={{ base: 4, lg: 8 }} spacingY={{ base: 6, lg: 0 }}>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://twitter.com/teamgeobuff"
          aria-label="Twitter link"
          isExternal
        >
          <Twitter />
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://instagram.com/teamgeobuff"
          aria-label="Instagram link"
          isExternal
        >
          <Instagram />
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://facebook.com/teamgeobuff"
          aria-label="Facebook link"
          isExternal
        >
          <Facebook />
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://reddit.com/r/GeoBuff"
          aria-label="Reddit link"
          isExternal
        >
          <Reddit />
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href={process.env.NEXT_PUBLIC_DISCORD_LINK}
          aria-label="Discord link"
          isExternal
        >
          <Discord />
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://github.com/GeoBuff"
          aria-label="GitHub link"
          isExternal
        >
          <GitHub />
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://www.youtube.com/channel/UCDsUu_8r98ORJqsILXGRlEQ"
          aria-label="YouTube link"
          isExternal
        >
          <YouTube />
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://www.twitch.tv/teamgeobuff"
          aria-label="Twitch link"
          isExternal
        >
          <Twitch />
        </Link>
      </Flex>
    </SimpleGrid>
  </Flex>
);

interface Props {
  variant?: FooterVariant;
}

export const FooterContainer: FC<Props> = ({
  variant = FooterVariant.EXTENDED,
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const companyLinks = [
    {
      href: "/our-mission",
      text: t.global.ourMission,
      isExternal: false,
    },
    {
      href: "/our-values",
      text: t.global.ourValues,
      isExternal: false,
    },
    {
      href: "/team",
      text: t.global.meetTheTeam,
      isExternal: false,
    },
    {
      href: "/resources",
      text: t.global.resources,
      isExternal: false,
    },
    {
      href: process.env.NEXT_PUBLIC_DISCORD_LINK,
      text: t.global.support,
      isExternal: true,
    },
  ];

  const furtherInfoLinks = [
    {
      href: "/privacy-policy",
      text: t.global.privacyPolicy,
      isExternal: false,
    },
    {
      href: "/terms-of-service",
      text: t.global.termsOfService,
      isExternal: false,
    },
    {
      href: "/cookie-policy",
      text: t.global.cookiePolicy,
      isExternal: false,
    },
    {
      href: "/acceptable-use-policy",
      text: t.global.acceptableUsePolicy,
      isExternal: false,
    },
    {
      href: "/faq",
      text: t.global.faq,
      isExternal: false,
    },
  ];

  return (
    <Footer
      variant={variant}
      isMobile={isMobile}
      isAppMobile={process.env.NEXT_PUBLIC_APP_MODE === "mobile"}
      legalStatement={`© ${new Date().getFullYear()} GeoBuff. ${
        t.footer.allRightsReserved
      }.`}
      columnOneHeading={t.footer.company}
      columnOneLinks={companyLinks}
      columnTwoHeading={t.footer.furtherInformation}
      columnTwoLinks={furtherInfoLinks}
      logo={<GeoBuffLogo isGrayScale />}
      description={t.footer.description}
      socialIcons={socialIcons}
      extendedBottomRightContent={<FooterPlaysContainer />}
    />
  );
};
