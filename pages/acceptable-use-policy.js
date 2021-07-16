import React from "react";
import Head from "next/head";

import {
  Box,
  Text,
  Heading,
  Stack,
  OrderedList,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";

const AcceptableUsePolicy = () => (
  <MainView>
    <Head>
      <title>Acceptable Use Policy - GeoBuff</title>
    </Head>
    <Box>
      <HeroHeader heading="Acceptable Use Policy" />
      <Box background="white">
        <Box
          maxWidth={{ base: "80%", md: "50%" }}
          mx="auto"
          py={12}
          fontSize={{ base: "12px", md: "inherit" }}
        >
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              This acceptable use policy covers the products, services, and
              technologies (collectively referred to as the
              &ldquo;Products&rdquo;) provided by GeoBuff under any ongoing
              agreement. It’s designed to protect us, our customers and the
              general Internet community from unethical, irresponsible and
              illegal activity.{" "}
            </Text>
            <Text>
              GeoBuff customers found engaging in activities prohibited by this
              acceptable use policy can be liable for service suspension and
              account termination. In extreme cases, we may be legally obliged
              to report such customers to the relevant authorities.{" "}
            </Text>
            <Text>This policy was last reviewed on 15 July 2021. </Text>
          </Stack>

          <Heading as="h3" size="lg">
            Fair use
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              We provide our facilities with the assumption your use will be
              &ldquo;business as usual&rdquo;, as per our offer schedule. If
              your use is considered to be excessive, then additional fees may
              be charged or capacity may be restricted.{" "}
            </Text>
            <Text>
              We are opposed to all forms of abuse, discrimination, rights
              infringement and/or any action that harms or disadvantages any
              group, individual or resource. We expect our customers and, where
              applicable, their users (&ldquo;end-users&rdquo;) to likewise
              engage our Products with similar intent.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            Customer accountability
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              We regard our customers as being responsible for their own actions
              as well as for the actions of anyone using our Products with the
              customer’s permission. This responsibility also applies to anyone
              using our Products on an unauthorised basis as a result of the
              customer’s failure to put in place reasonable security measures.{" "}
            </Text>
            <Text>
              By accepting Products from us, our customers agree to ensure
              adherence to this policy on behalf of anyone using the Products as
              their end users. Complaints regarding the actions of customers or
              their end-users will be forwarded to the nominated contact for the
              account in question.{" "}
            </Text>
            <Text>
              If a customer — or their end-user or anyone using our Products as
              a result of the customer — violates our acceptable use policy, we
              reserve the right to terminate any Products associated with the
              offending account or the account itself or take any remedial or
              preventative action we deem appropriate without notice. To the
              extent permitted by law, no credit will be available for
              interruptions of service resulting from any violation of our
              acceptable use policy.{" "}
            </Text>
          </Stack>

          <Heading as="h3" size="lg">
            Prohibited activity
          </Heading>
          <Heading as="h4" size="md" mt={6} mb={3}>
            Copyright infringement and access to unauthorised material
          </Heading>
          <Text my={3}>
            Our Products must not be used to transmit, distribute or store any
            material in violation of any applicable law. This includes but isn’t
            limited to:{" "}
          </Text>
          <OrderedList my={3}>
            <ListItem>
              any material protected by copyright, trademark, trade secret or
              other intellectual property right used without proper
              authorization, and
            </ListItem>
            <ListItem>
              any material that is obscene, defamatory, constitutes an illegal
              threat or violates export control laws.
            </ListItem>
          </OrderedList>
          <Text mt={3} mb={6}>
            The customer is solely responsible for all material they input,
            upload, disseminate, transmit, create or publish through or on our
            Products, and for obtaining legal permission to use any works
            included in such material.{" "}
          </Text>

          <Heading as="h4" size="md">
            SPAM and unauthorised message activity
          </Heading>
          <Stack spacing={3} mt={3} mb={6}>
            <Text>
              Our Products must not be used for the purpose of sending
              unsolicited bulk or commercial messages in violation of the laws
              and regulations applicable to your jurisdiction (“spam”). This
              includes but isn’t limited to sending spam, soliciting customers
              from spam sent from other service providers, and collecting
              replies to spam sent from other service providers.{" "}
            </Text>
            <Text>
              Our Products must not be used for the purpose of running
              unconfirmed mailing lists or telephone number lists
              (&ldquo;messaging lists&rdquo;). This includes but isn’t limited
              to subscribing email addresses or telephone numbers to any
              messaging list without the permission of the email address or
              telephone number owner, and storing any email addresses or
              telephone numbers subscribed in this way. All messaging lists run
              on or hosted by our Products must be &ldquo;confirmed
              opt-in&rdquo;. Verification of the address or telephone number
              owner’s express permission must be available for the lifespan of
              the messaging list.{" "}
            </Text>
            <Text>
              We prohibit the use of email lists, telephone number lists or
              databases purchased from third parties intended for spam or
              unconfirmed messaging list purposes on our Products.{" "}
            </Text>
            <Text>
              This spam and unauthorised message activity policy applies to
              messages sent using our Products, or to messages sent from any
              network by the customer or any person on the customer’s behalf,
              that directly or indirectly refer the recipient to a site hosted
              via our Products.{" "}
            </Text>
          </Stack>

          <Heading as="h4" size="md">
            Unethical, exploitative, and malicious activity
          </Heading>
          <Stack spacing={3} my={3}>
            <Text>
              Our Products must not be used for the purpose of advertising,
              transmitting or otherwise making available any software, program,
              product or service designed to violate this acceptable use policy,
              or the acceptable use policy of other service providers. This
              includes but isn’t limited to facilitating the means to send spam
              and the initiation of network sniffing, pinging, packet spoofing,
              flooding, mail-bombing and denial-of-service attacks.{" "}
            </Text>
            <Text>
              Our Products must not be used to access any account or electronic
              resource where the group or individual attempting to gain access
              does not own or is not authorised to access the resource (e.g.
              &ldquo;hacking&rdquo;, &ldquo;cracking&rdquo;,
              &ldquo;phreaking&rdquo;, etc.).{" "}
            </Text>
            <Text>
              Our Products must not be used for the purpose of intentionally or
              recklessly introducing viruses or malicious code into our Products
              and systems.{" "}
            </Text>
            <Text>
              Our Products must not be used for purposely engaging in activities
              designed to harass another group or individual. Our definition of
              harassment includes but is not limited to denial-of-service
              attacks, hate-speech, advocacy of racial or ethnic intolerance,
              and any activity intended to threaten, abuse, infringe upon the
              rights of or discriminate against any group or individual.{" "}
            </Text>
            <Text>
              Other activities considered unethical, exploitative and malicious
              include:{" "}
            </Text>
          </Stack>
          <OrderedList>
            <ListItem>
              Obtaining (or attempting to obtain) services from us with the
              intent to avoid payment;
            </ListItem>
            <ListItem>
              Using our facilities to obtain (or attempt to obtain) services
              from another provider with the intent to avoid payment;
            </ListItem>
            <ListItem>
              The unauthorised access, alteration or destruction (or any attempt
              thereof) of any information about our customers or end-users, by
              any means or device;
            </ListItem>
            <ListItem>
              Using our facilities to interfere with the use of our facilities
              and network by other customers or authorised individuals;
            </ListItem>
            <ListItem>
              Publishing or transmitting any content of links that incite
              violence, depict a violent act, depict child pornography or
              threaten anyone’s health and safety;
            </ListItem>
            <ListItem>
              Any act or omission in violation of consumer protection laws and
              regulations;
            </ListItem>
            <ListItem>Any violation of a person’s privacy.</ListItem>
          </OrderedList>
          <Text mt={3} mb={6}>
            Our Products may not be used by any person or entity, which is
            involved with or suspected of involvement in activities or causes
            relating to illegal gambling; terrorism; narcotics trafficking; arms
            trafficking or the proliferation, development, design, manufacture,
            production, stockpiling, or use of nuclear, chemical or biological
            weapons, weapons of mass destruction, or missiles; in each case
            including any affiliation with others whatsoever who support the
            above such activities or causes.{" "}
          </Text>

          <Heading as="h4" size="md">
            Unauthorised use of GeoBuff property
          </Heading>
          <Text mt={3} mb={6}>
            We prohibit the impersonation of GeoBuff, the representation of a
            significant business relationship with GeoBuff, or ownership of any
            GeoBuff property (including our Products and brand) for the purpose
            of fraudulently gaining service, custom, patronage or user trust.{" "}
          </Text>

          <Heading as="h3" size="lg">
            About this policy
          </Heading>
          <Stack spacing={3} my={3}>
            <Text>
              This policy outlines a non-exclusive list of activities and intent
              we deem unacceptable and incompatible with our brand.{" "}
            </Text>
            <Text>
              We reserve the right to modify this policy at any time by
              publishing the revised version on our website. The revised version
              will be effective from the earlier of:{" "}
            </Text>
          </Stack>
          <UnorderedList mb={6}>
            <ListItem>
              the date the customer uses our Products after we publish the
              revised version on our website; or
            </ListItem>
            <ListItem>
              30 days after we publish the revised version on our website.{" "}
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </Box>
  </MainView>
);

export default AcceptableUsePolicy;
