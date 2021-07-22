import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Logo from "../Logo";
import FooterPlaysContainer from "../../containers/FooterPlaysContainer/FooterPlaysContainer";

import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";

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
  "GeoBuff is the world's leading competitive platform for geography based games and quizzes.";

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
      paddingX={{ base: 2, md: 10 }}
    >
      <Flex
        direction="column"
        width={{ base: "100%", md: "inherit" }}
        marginY={{ base: 4, md: 0 }}
      >
        <Text color="#B0B0B0" fontWeight={600} marginBottom={4}>
          {"Company"}
        </Text>
        <Flex direction="column" textAlign="left">
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
        marginX={{ base: 4, md: 10 }}
        marginRight={{ base: 0, md: "auto" }}
      >
        <Text color="#B0B0B0" fontWeight={600} marginBottom={4}>
          {"Further Information"}
        </Text>
        <Flex direction="column" textAlign="left">
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

      <Flex direction={{ base: "column", md: "row" }} justifyContent="flex-end">
        <Flex
          direction="column"
          marginBottom={{ base: 5, md: 0 }}
          justifyContent="center"
        >
          <Flex width="100%" justifyContent="flex-end">
            <Logo isGrayScale />
          </Flex>
          <Text
            marginTop={4}
            marginLeft={1}
            color="#B0B0B0"
            maxWidth="390px"
            textAlign="right"
          >
            {footerCopy}
          </Text>
        </Flex>
      </Flex>
    </Flex>

    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-end", md: "center" }}
      justifyContent="space-between"
      borderTop="2px solid #E3E1E1"
      paddingY={{ base: 4, md: 3 }}
      paddingX={{ base: 2, md: 10 }}
    >
      <Text color="#B0B0B0" fontSize="14px" marginBottom={{ base: 2, md: 0 }}>
        {"© 2021 GeoBuff. All rights reserved."}
      </Text>
      <FooterPlaysContainer />
    </Flex>
  </Flex>
);

const Footer = ({ variant }) => {
  switch (variant) {
    case "simple":
      return simpleFooter;
    default:
      return extendedFooter;
  }
};

Footer.propTypes = {
  variant: PropTypes.oneOf(["simple", "extended"]),
};
Footer.defaultProps = {
  variant: "extended",
};

export default Footer;
