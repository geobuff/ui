import React, { FC } from "react";
import Link from "next/link";
import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";

import Logo from "../Logo";
import FooterPlaysContainer from "../../containers/FooterPlaysContainer";
import { FooterVariant } from "../../types/footer-variant";

const companyLinks = [
  {
    href: "/our-mission",
    text: "Our Mission",
  },
  {
    href: "/careers",
    text: "Careers",
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
  "GeoBuff is the world's leading competitive platform for geography-based games and quizzes.";

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
        {"© 2021 GeoBuff. All rights reserved."}
      </Text>
    </Flex>
  </Flex>
);

const extendedFooter = (
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
        </Flex>
      </Flex>
    </Flex>

    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      borderTop="2px solid #E3E1E1"
      paddingTop={{ base: 3, md: 5 }}
      paddingBottom={{ base: 2, md: 3 }}
      paddingX={{ base: 2, md: 10 }}
    >
      <Text color="#B0B0B0" fontSize="14px" marginBottom={{ base: 2, md: 0 }}>
        {"© 2021 GeoBuff. All rights reserved."}
      </Text>
      <FooterPlaysContainer />
    </Flex>
  </Flex>
);

interface Props {
  variant?: FooterVariant;
}

const Footer: FC<Props> = ({ variant = FooterVariant.EXTENDED }) => {
  switch (variant) {
    case FooterVariant.SIMPLE:
      return simpleFooter;
    default:
      return extendedFooter;
  }
};

export default Footer;
