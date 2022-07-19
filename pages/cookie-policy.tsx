import React, { FC } from "react";
import Head from "next/head";
import { Box, Text, Heading, Stack, Link } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";

const CookiePolicy: FC = () => (
  <MainView>
    <Head>
      <title>Cookie Policy - GeoBuff</title>
      <meta
        name="description"
        content="This cookie policy is part of GeoBuff's privacy policy. It covers the use of cookies between your device and our site."
      />
    </Head>
    <Box>
      <HeroHeader heading="Cookie Policy" />
      <Box background="white">
        <Box
          maxWidth={{ base: "80%", md: "50%" }}
          mx="auto"
          py={12}
          fontSize={{ base: "12px", md: "inherit" }}
        >
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              We use cookies to help improve your experience of our website at{" "}
              <Link href="https://geobuff.com">https://geobuff.com</Link>. This
              cookie policy is part of GeoBuff&#39;s privacy policy. It covers
              the use of cookies between your device and our site.{" "}
            </Text>
            <Text>
              We also provide basic information on third-party services we may
              use, who may also use cookies as part of their service. This
              policy does not cover their cookies.{" "}
            </Text>
            <Text>
              If you don’t wish to accept cookies from us, you should instruct
              your browser to refuse cookies from{" "}
              <Link href="https://geobuff.com">https://geobuff.com</Link>. In
              such a case, we may be unable to provide you with some of your
              desired content and services.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            What is a cookie?
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              A cookie is a small piece of data that a website stores on your
              device when you visit. It typically contains information about the
              website itself, a unique identifier that allows the site to
              recognise your web browser when you return, additional data that
              serves the cookie’s purpose, and the lifespan of the cookie
              itself.{" "}
            </Text>
            <Text>
              Cookies are used to enable certain features (eg logging in), track
              site usage (eg analytics), store your user settings (eg time zone,
              notification preferences), and to personalise your content (eg
              advertising, language).{" "}
            </Text>
            <Text>
              Cookies set by the website you are visiting are usually referred
              to as first-party cookies. They typically only track your activity
              on that particular site.{" "}
            </Text>
            <Text>
              Cookies set by other sites and companies (i.e. third parties) are
              called third-party cookies They can be used to track you on other
              websites that use the same third-party service.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            Types of cookies and how we use them
          </Heading>
          <Heading as="h4" size="md" mt={6} mb={3}>
            Essential cookies
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              Essential cookies are crucial to your experience of a website,
              enabling core features like user logins, account management,
              shopping carts, and payment processing.{" "}
            </Text>
            <Text>
              We use essential cookies to enable certain functions on our
              website.{" "}
            </Text>
          </Stack>

          <Heading as="h4" size="md">
            Performance cookies
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              Performance cookies track how you use a website during your visit.
              Typically, this information is anonymous and aggregated, with
              information tracked across all site users. They help companies
              understand visitor usage patterns, identify and diagnose problems
              or errors their users may encounter, and make better strategic
              decisions in improving their audience’s overall website
              experience. These cookies may be set by the website you’re
              visiting (first-party) or by third-party services. They do not
              collect personal information about you.{" "}
            </Text>
            <Text>We do not use this type of cookie on our site. </Text>
          </Stack>

          <Heading as="h4" size="md">
            Functionality cookies
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              Functionality cookies are used to collect information about your
              device and any settings you may configure on the website you’re
              visiting (like language and time zone settings). With this
              information, websites can provide you with customised, enhanced,
              or optimised content and services. These cookies may be set by the
              website you’re visiting (first-party) or by third-party services.{" "}
            </Text>
            <Text>We do not use this type of cookie on our site. </Text>
          </Stack>

          <Heading as="h4" size="md">
            Targeting/advertising cookies
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              Targeting/advertising cookies help determine what promotional
              content is most relevant and appropriate to you and your
              interests. Websites may use them to deliver targeted advertising
              or limit the number of times you see an advertisement. This helps
              companies improve the effectiveness of their campaigns and the
              quality of content presented to you. These cookies may be set by
              the website you’re visiting (first-party) or by third-party
              services. Targeting/advertising cookies set by third-parties may
              be used to track you on other websites that use the same
              third-party service.{" "}
            </Text>
            <Text>We do not use this type of cookie on our site. </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  </MainView>
);

export default CookiePolicy;
