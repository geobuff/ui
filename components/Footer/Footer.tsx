import React, { FC } from "react";
import Link from "next/link";
import {
  Flex,
  Text,
  Link as ChakraLink,
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

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

const companyLinks = [
  {
    href: "/our-mission",
    text: "Our Mission",
  },
  {
    href: process.env.NEXT_PUBLIC_DISCORD_LINK,
    text: "Support",
  },
  {
    href: "/faq",
    text: "F.A.Q.",
  },
  {
    href: "/merch",
    text: "Merch",
  },
];

const furtherInfoLinks = [
  {
    href: "/privacy-policy",
    text: "Privacy Policy",
  },
  {
    href: "/terms-of-service",
    text: "Terms of Service",
  },
  {
    href: "/cookie-policy",
    text: "Cookie Policy",
  },
  {
    href: "/acceptable-use-policy",
    text: "Acceptable Use Policy",
  },
];

const footerCopy =
  "GeoBuff is the world's leading platform for Geography education and trivia.";

const currentYear = new Date().getFullYear();
const footerLegal = `© ${currentYear} GeoBuff. All rights reserved.`;

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

const socialIcons = (
  <Flex justifyContent="center" mt={{ base: 12, md: 0 }}>
    <SimpleGrid columns={{ base: 4, lg: 8 }} spacingY={{ base: 6, lg: 0 }}>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link href="https://twitter.com/teamgeobuff" passHref>
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <Twitter />
          </ChakraLink>
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link href="https://instagram.com/teamgeobuff" passHref>
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <Instagram />
          </ChakraLink>
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link href="https://facebook.com/teamgeobuff" passHref>
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <Facebook />
          </ChakraLink>
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link href="https://reddit.com/r/GeoBuff" passHref>
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <Reddit />
          </ChakraLink>
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link href={process.env.NEXT_PUBLIC_DISCORD_LINK} passHref>
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <Discord />
          </ChakraLink>
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link href="https://github.com/GeoBuff" passHref>
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <GitHub />
          </ChakraLink>
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link
          href="https://www.youtube.com/channel/UCDsUu_8r98ORJqsILXGRlEQ"
          passHref
        >
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <YouTube />
          </ChakraLink>
        </Link>
      </Flex>
      <Flex direction="column" justifyContent="center" mx={3}>
        <Link href="https://www.twitch.tv/teamgeobuff" passHref>
          <ChakraLink target="_blank" rel="noopener noreferrer">
            <Twitch />
          </ChakraLink>
        </Link>
      </Flex>
    </SimpleGrid>
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
            {"Company"}
          </Text>
          <Flex direction="column">
            {companyLinks.map(({ href, text }) => (
              <Link key={href} href={href} passHref>
                <ChakraLink
                  color="#B0B0B0"
                  fontSize="14px"
                  fontWeight="medium"
                  marginY={{ base: 1, md: 1 }}
                >
                  {text}
                </ChakraLink>
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
            {"Further Information"}
          </Text>
          <Flex direction="column">
            {furtherInfoLinks.map(({ href, text }) => (
              <Link key={href} href={href}>
                <ChakraLink
                  color="#B0B0B0"
                  fontSize="14px"
                  fontWeight="medium"
                  marginY={{ base: 1, md: 1 }}
                >
                  {text}
                </ChakraLink>
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
              {footerCopy}
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

interface Props {
  variant?: FooterVariant;
}

const Footer: FC<Props> = ({ variant = FooterVariant.EXTENDED }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  switch (variant) {
    case FooterVariant.SIMPLE:
      return simpleFooter;
    default:
      return extendedFooter(isMobile);
  }
};

export default Footer;
