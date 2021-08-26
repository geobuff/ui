import React, { FC } from "react";
import Head from "next/head";
import Link from "next/link";

import {
  Box,
  Text,
  Heading,
  OrderedList,
  ListItem,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";

const TermsOfService: FC = () => (
  <MainView>
    <Head>
      <title>Terms of Service - GeoBuff</title>
    </Head>
    <Box>
      <HeroHeader heading="Terms of Service" />
      <Box background="white">
        <Box
          maxWidth={{ base: "80%", md: "50%" }}
          mx="auto"
          py={12}
          fontSize={{ base: "12px", md: "inherit" }}
        >
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              These Terms of Service govern your use of the website located at{" "}
              <Link href="https://geobuff.com">
                <ChakraLink>https://geobuff.com</ChakraLink>
              </Link>{" "}
              and any related services provided by GeoBuff.{" "}
            </Text>
            <Text>
              By accessing{" "}
              <Link href="https://geobuff.com">
                <ChakraLink>https://geobuff.com</ChakraLink>
              </Link>
              , you agree to abide by these Terms of Service and to comply with
              all applicable laws and regulations. If you do not agree with
              these Terms of Service, you are prohibited from using or accessing
              this website or using any other services provided by GeoBuff.{" "}
            </Text>
            <Text>
              We, GeoBuff, reserve the right to review and amend any of these
              Terms of Service at our sole discretion. Upon doing so, we will
              update this page. Any changes to these Terms of Service will take
              effect immediately from the date of publication.{" "}
            </Text>
            <Text>
              These Terms of Service were last updated on 15 July 2021.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            Limitations of Use
          </Heading>
          <Text my={3}>
            By using this website, you warrant on behalf of yourself, your
            users, and other parties you represent that you will not:{" "}
          </Text>
          <OrderedList mb={6}>
            <ListItem>
              modify, copy, prepare derivative works of, decompile, or reverse
              engineer any materials and software contained on this website;
            </ListItem>
            <ListItem>
              remove any copyright or other proprietary notations from any
              materials and software on this website;
            </ListItem>
            <ListItem>
              transfer the materials to another person or &ldquo;mirror&rdquo;
              the materials on any other server;
            </ListItem>
            <ListItem>
              knowingly or negligently use this website or any of its associated
              services in a way that abuses or disrupts our networks or any
              other service GeoBuff provides;
            </ListItem>
            <ListItem>
              use this website or its associated services to transmit or publish
              any harassing, indecent, obscene, fraudulent, or unlawful
              material;
            </ListItem>
            <ListItem>
              use this website or its associated services in violation of any
              applicable laws or regulations;
            </ListItem>
            <ListItem>
              use this website in conjunction with sending unauthorised
              advertising or spam;
            </ListItem>
            <ListItem>
              harvest, collect or gather user data without the user’s consent;
              or
            </ListItem>
            <ListItem>
              use this website or its associated services in such a way that may
              infringe the privacy, intellectual property rights, or other
              rights of third parties.
            </ListItem>
          </OrderedList>

          <Heading as="h3" size="lg">
            Intellectual Property
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              The intellectual property in the materials contained in this
              website are owned by or licensed to GeoBuff and are protected by
              applicable copyright and trademark law. We grant our users
              permission to download one copy of the materials for personal,
              non-commercial transitory use.{" "}
            </Text>
            <Text>
              This constitutes the grant of a license, not a transfer of title.
              This license shall automatically terminate if you violate any of
              these restrictions or the Terms of Service, and may be terminated
              by GeoBuff at any time.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            User-Generated Content
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              You retain your intellectual property ownership rights over
              content you submit to us for publication on our website. We will
              never claim ownership of your content but we do require a license
              from you in order to use it.{" "}
            </Text>
            <Text>
              When you use our website or its associated services to post,
              upload, share or otherwise transmit content covered by
              intellectual property rights, you grant to us a non-exclusive,
              royalty-free, transferable, sub-licensable, worldwide license to
              use, distribute, modify, run, copy, publicly display, translate or
              otherwise create derivative works of your content in a manner that
              is consistent with your privacy preferences and our Privacy
              Policy.{" "}
            </Text>
            <Text>
              The license you grant us can be terminated at any time by deleting
              your content or account. However, to the extent that we (or our
              partners) have used your content in connection with commercial or
              sponsored content, the license will continue until the relevant
              commercial or post has been discontinued by us.{" "}
            </Text>
            <Text>
              You give us permission to use your username and other identifying
              information associated with your account in a manner that is
              consistent with your privacy preferences and our Privacy Policy.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            Liability
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              Our website and the materials on our website are provided on an
              `&apos;`as is`&apos;` basis. To the extent permitted by law,
              GeoBuff makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of
              intellectual property, or other violation of rights.{" "}
            </Text>
            <Text>
              In no event shall GeoBuff or its suppliers be liable for any
              consequential loss suffered or incurred by you or any third party
              arising from the use or inability to use this website or the
              materials on this website, even if GeoBuff or an authorised
              representative has been notified, orally or in writing, of the
              possibility of such damage.{" "}
            </Text>
            <Text>
              In the context of this agreement, &ldquo;consequential loss&rdquo;
              includes any consequential loss, indirect loss, real or
              anticipated loss of profit, loss of benefit, loss of revenue, loss
              of business, loss of goodwill, loss of opportunity, loss of
              savings, loss of reputation, loss of use and/or loss or corruption
              of data, whether under statute, contract, equity, tort (including
              negligence), indemnity or otherwise.{" "}
            </Text>
            <Text>
              Because some jurisdictions do not allow limitations on implied
              warranties, or limitations of liability for consequential or
              incidental damages, these limitations may not apply to you.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            Accuracy of Materials
          </Heading>
          <Text mt={3} mb={6}>
            The materials appearing on our website are not comprehensive and are
            for general information purposes only. GeoBuff does not warrant or
            make any representations concerning the accuracy, likely results, or
            reliability of the use of the materials on this website, or
            otherwise relating to such materials or on any resources linked to
            this website.{" "}
          </Text>

          <Heading as="h3" size="lg">
            Links
          </Heading>
          <Text mt={3} mb={6}>
            GeoBuff has not reviewed all of the sites linked to its website and
            is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement, approval or
            control by GeoBuff of the site. Use of any such linked site is at
            your own risk and we strongly advise you make your own
            investigations with respect to the suitability of those sites.{" "}
          </Text>

          <Heading as="h3" size="lg">
            Right to Terminate
          </Heading>
          <Text mt={3} mb={6}>
            We may suspend or terminate your right to use our website and
            terminate these Terms of Service immediately upon written notice to
            you for any breach of these Terms of Service.{" "}
          </Text>

          <Heading as="h3" size="lg">
            Severance
          </Heading>
          <Text mt={3} mb={6}>
            Any term of these Terms of Service which is wholly or partially void
            or unenforceable is severed to the extent that it is void or
            unenforceable. The validity of the remainder of these Terms of
            Service is not affected.{" "}
          </Text>

          <Heading as="h3" size="lg">
            Governing Law
          </Heading>
          <Text mt={3} mb={6}>
            These Terms of Service are governed by and construed in accordance
            with the laws of New Zealand. You irrevocably submit to the
            exclusive jurisdiction of the courts in that State or location.{" "}
          </Text>
        </Box>
      </Box>
    </Box>
  </MainView>
);

export default TermsOfService;
