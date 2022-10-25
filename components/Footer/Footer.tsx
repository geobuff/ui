import React, { FC, useContext } from "react";

import {
  Flex,
  Text,
  Link,
  useBreakpointValue,
  SimpleGrid,
} from "@chakra-ui/react";

import Logo from "../Logo";
import FooterPlaysContainer from "../../containers/FooterPlaysContainer";
import { FooterVariant } from "../../types/footer-variant";
import Twitter from "../Twitter";
import Instagram from "../Instagram/Instagram";
import Facebook from "../Facebook";
import Discord from "../Discord";
import GitHub from "../GitHub";
import Reddit from "../Reddit";
import YouTube from "../YouTube";
import Twitch from "../Twitch";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

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

const Footer: FC<Props> = ({ variant = FooterVariant.EXTENDED }) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const companyLinks = [
    {
      href: "/our-mission",
      text: t.navigation.ourMission,
      isExternal: false,
    },
    {
      href: "/our-values",
      text: t.navigation.ourValues,
      isExternal: false,
    },
    {
      href: "/team",
      text: t.navigation.meetTheTeam,
      isExternal: false,
    },
    {
      href: "/resources",
      text: t.navigation.resources,
      isExternal: false,
    },
    {
      href: process.env.NEXT_PUBLIC_DISCORD_LINK,
      text: t.navigation.support,
      isExternal: true,
    },
  ];

  const furtherInfoLinks = [
    {
      href: "/privacy-policy",
      text: t.navigation.privacyPolicy,
    },
    {
      href: "/terms-of-service",
      text: t.navigation.termsOfService,
    },
    {
      href: "/cookie-policy",
      text: t.navigation.cookiePolicy,
    },
    {
      href: "/acceptable-use-policy",
      text: t.navigation.acceptableUsePolicy,
    },
    {
      href: "/faq",
      text: t.navigation.faq,
    },
  ];

  const currentYear = new Date().getFullYear();
  const footerLegal = `© ${currentYear} GeoBuff. ${t.footer.allRightsReserved}.`;

  const simpleFooter = (
    <Flex
      as="footer"
      direction="column"
      justifyContent="center"
      marginTop="auto"
      paddingY={6}
    >
      <Flex alignSelf="center">
        <Text color="gray.500" fontSize={{ base: "11px", md: "14px" }}>
          {footerLegal}
        </Text>
      </Flex>
    </Flex>
  );

  const extendedFooter = (isMobile: boolean) => (
    <Flex
      as="footer"
      borderTop="2px solid #E3E1E1"
      direction="column"
      justifyContent="space-between"
      marginTop="auto"
      paddingY={3}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        marginY={5}
        paddingX={{ base: 6, md: 10 }}
        width="100%"
      >
        <Flex
          direction="row"
          width="100%"
          justifyContent="space-between"
          paddingX={{ base: "5%", md: 0 }}
        >
          <Flex
            direction="column"
            marginBottom={{ base: 10, md: 0 }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text color="#8a8a8a" fontWeight={600} marginBottom={2}>
              {t.footer.company}
            </Text>
            <Flex direction="column">
              {companyLinks.map(({ href, text, isExternal }) => (
                <Link
                  key={href}
                  href={href}
                  color="#B0B0B0"
                  fontSize="14px"
                  fontWeight="medium"
                  marginY={{ base: 1, md: 1 }}
                  isExternal={isExternal}
                >
                  {text}
                </Link>
              ))}
            </Flex>
          </Flex>

          <Flex
            direction="column"
            marginX={{ base: 0, md: 24 }}
            marginBottom={{ base: 10, md: 0 }}
            marginRight={{ base: 0, md: "auto" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text color="#8a8a8a" fontWeight={600} marginBottom={2}>
              {t.footer.furtherInformation}
            </Text>
            <Flex direction="column">
              {furtherInfoLinks.map(({ href, text }) => (
                <Link
                  key={href}
                  href={href}
                  color="#B0B0B0"
                  fontSize="14px"
                  fontWeight="medium"
                  marginY={{ base: 1, md: 1 }}
                >
                  {text}
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          marginLeft={{ base: 0, md: "auto" }}
          justifyContent="flex-end"
        >
          <Flex
            direction="column"
            marginBottom={{ base: 5, md: 0 }}
            justifyContent="center"
          >
            <Flex
              width="100%"
              justifyContent={{ base: "center", md: "flex-end" }}
            >
              <Logo isGrayScale />
            </Flex>
            <Flex justifyContent={{ base: "center", md: "center" }}>
              <Text
                marginTop={4}
                marginLeft={1}
                color="#8a8a8a"
                maxWidth={"400px"}
                textAlign={{ base: "center", md: "right" }}
              >
                {t.footer.description}
              </Text>
            </Flex>
            {isMobile && socialIcons}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        borderTop="2px solid #E3E1E1"
        paddingTop={{ base: 3, md: 5 }}
        paddingBottom={{ base: isAppMobile ? 6 : 2, md: 3 }}
        paddingX={{ base: 2, md: 10 }}
      >
        <Text color="#B0B0B0" fontSize="14px" marginBottom={{ base: 2, md: 0 }}>
          {footerLegal}
        </Text>
        {!isMobile && socialIcons}
        <FooterPlaysContainer />
      </Flex>
    </Flex>
  );

  switch (variant) {
    case FooterVariant.SIMPLE:
      return simpleFooter;
    default:
      return extendedFooter(isMobile);
  }
};

export default Footer;
