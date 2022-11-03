import React, { FC, useContext } from "react";
import Head from "next/head";

import {
  Box,
  Text,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";

const PrivacyPolicy: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <MainView>
      <Head>
        <title>{`${t.global.privacyPolicy} - GeoBuff`}</title>
        <meta
          name="description"
          content="Your privacy is important to us. It is GeoBuff's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you."
        />
      </Head>
      <Box>
        <HeroHeader heading={t.global.privacyPolicy} />
        <Box background="white">
          <Box
            maxWidth={{ base: "80%", md: "50%" }}
            mx="auto"
            py={12}
            fontSize={{ base: "12px", md: "inherit" }}
          >
            <Stack spacing={3} mb={6}>
              <Text>
                {`${t.privacyPolicy.sectionOnePartOne} `}
                <a href="https://geobuff.com">https://geobuff.com</a>
                {`${t.privacyPolicy.sectionOnePartTwo} `}
              </Text>
              <Text>{t.privacyPolicy.sectionTwo}</Text>
              <Text>{t.privacyPolicy.sectionThree}</Text>
              <Text>{t.privacyPolicy.sectionFour}</Text>
              <Text>{t.privacyPolicy.sectionFive}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.informationWeCollectHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.informationWeCollectPartOne}</Text>
              <Text>{t.privacyPolicy.informationWeCollectPartTwo}</Text>
              <Text>{t.privacyPolicy.informationWeCollectPartThree}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.logDataHeader}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.logDataPartOne}</Text>
              <Text>{t.privacyPolicy.logDataPartTwo}</Text>
              <Text>{t.privacyPolicy.logDataPartThree}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.personalInformationHeading}
            </Heading>
            <Box mb={6}>
              <Stack spacing={3} my={3}>
                <Text>{t.privacyPolicy.personalInformationPartOne}</Text>
              </Stack>
              <UnorderedList>
                <ListItem>{t.global.email}</ListItem>
              </UnorderedList>
            </Box>

            <Heading as="h4" size="md">
              {t.privacyPolicy.userGeneratedContentHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.userGeneratedContentPartOne}</Text>
              <Text>{t.privacyPolicy.userGeneratedContentPartTwo}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.transactionDataHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.transactionDataPartOne}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.legitimateHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.legitimatePartOne}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.collectionHeading}
            </Heading>
            <Text my={3}>{t.privacyPolicy.collectionPartOne}</Text>
            <UnorderedList>
              <ListItem>{t.privacyPolicy.collectionPartTwo}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartThree}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFour}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFive}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSix}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSeven}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartEight}</ListItem>
            </UnorderedList>
            <Text my={3}>{t.privacyPolicy.collectionPartNine}</Text>
            <UnorderedList>
              <ListItem>{t.privacyPolicy.collectionPartTen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartEleven}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartTwelve}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartThirteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFourteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFifteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSixteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSeventeen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartEighteen}</ListItem>
            </UnorderedList>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.collectionPartNineteen}
            </Text>

            <Heading as="h4" size="md">
              {t.privacyPolicy.securityHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.securityPartOne}</Text>
              <Text>{t.privacyPolicy.securityPartTwo}</Text>
              <Text>{t.privacyPolicy.securityPartThree}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.howLongHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.howLongPartOne}</Text>
              <Text>{t.privacyPolicy.howLongPartTwo}</Text>
            </Stack>
            <Heading as="h3" size="lg">
              Children’s Privacy
            </Heading>
            <Text mt={3} mb={6}>
              We do not aim any of our products or services directly at children
              under the age of 13 and we do not knowingly collect personal
              information about children under 13.{" "}
            </Text>

            <Heading as="h3" size="lg">
              Disclosure of Personal Information to Third Parties
            </Heading>
            <Text my={3}>We may disclose personal information to: </Text>
            <UnorderedList>
              <ListItem>
                a parent, subsidiary or affiliate of our company
              </ListItem>
              <ListItem>
                third-party service providers for the purpose of enabling them
                to provide their services including (without limitation) IT
                service providers, data storage, hosting and server providers,
                analytics, error loggers, debt collectors, maintenance or
                problem-solving providers, marketing providers, professional
                advisors, and payment systems operators
              </ListItem>
              <ListItem>
                our employees, contractors, and/or related entities
              </ListItem>
              <ListItem>
                our existing or potential agents or business partners
              </ListItem>
              <ListItem>
                sponsors or promoters of any competition, sweepstakes, or
                promotion we run
              </ListItem>
              <ListItem>
                credit reporting agencies, courts, tribunals, and regulatory
                authorities, in the event you fail to pay for goods or services
                we have provided to you
              </ListItem>
              <ListItem>
                courts, tribunals, regulatory authorities, and law enforcement
                officers, as required by law, in connection with any actual or
                prospective legal proceedings, or in order to establish,
                exercise, or defend our legal rights
              </ListItem>
              <ListItem>
                third parties, including agents or sub-contractors who assist us
                in providing information, products, services, or direct
                marketing to you
              </ListItem>
              <ListItem>third parties to collect and process data</ListItem>
              <ListItem>
                an entity that buys, or to which we transfer all or
                substantially all of our assets and business
              </ListItem>
            </UnorderedList>
            <Text my={3}>Third parties we currently use include: </Text>
            <UnorderedList mb={6}>
              <ListItem>Google Analytics</ListItem>
              <ListItem>SendGrid</ListItem>
              <ListItem>Stripe</ListItem>
            </UnorderedList>

            <Heading as="h3" size="lg">
              Your Rights and Controlling Your Personal Information
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                <strong>Your choice:</strong> By providing personal information
                to us, you understand we will collect, hold, use, and disclose
                your personal information in accordance with this privacy
                policy. You do not have to provide personal information to us,
                however, if you do not, it may affect your use of our website or
                the products and/or services offered on or through it.{" "}
              </Text>
              <Text>
                <strong>Information from third parties:</strong> If we receive
                personal information about you from a third party, we will
                protect it as set out in this privacy policy. If you are a third
                party providing personal information about somebody else, you
                represent and warrant that you have such person’s consent to
                provide the personal information to us.{" "}
              </Text>
              <Text>
                <strong>Marketing permission:</strong> If you have previously
                agreed to us using your personal information for direct
                marketing purposes, you may change your mind at any time by
                contacting us using the details below.{" "}
              </Text>
              <Text>
                <strong>Access:</strong> You may request details of the personal
                information that we hold about you.{" "}
              </Text>
              <Text>
                <strong>Correction:</strong> If you believe that any information
                we hold about you is inaccurate, out of date, incomplete,
                irrelevant, or misleading, please contact us using the details
                provided in this privacy policy. We will take reasonable steps
                to correct any information found to be inaccurate, incomplete,
                misleading, or out of date.{" "}
              </Text>
              <Text>
                <strong>Non-discrimination:</strong> We will not discriminate
                against you for exercising any of your rights over your personal
                information. Unless your personal information is required to
                provide you with a particular service or offer (for example
                processing transaction data), we will not deny you goods or
                services and/or charge you different prices or rates for goods
                or services, including through granting discounts or other
                benefits, or imposing penalties, or provide you with a different
                level or quality of goods or services.{" "}
              </Text>
              <Text>
                <strong>Downloading of Personal Information:</strong> We provide
                a means for you to download the personal information you have
                shared through our site. Please contact us for more information.{" "}
              </Text>
              <Text>
                <strong>Notification of data breaches:</strong> We will comply
                with laws applicable to us in respect of any data breach.{" "}
              </Text>
              <Text>
                <strong>Complaints:</strong> If you believe that we have
                breached a relevant data protection law and wish to make a
                complaint, please contact us using the details below and provide
                us with full details of the alleged breach. We will promptly
                investigate your complaint and respond to you, in writing,
                setting out the outcome of our investigation and the steps we
                will take to deal with your complaint. You also have the right
                to contact a regulatory body or data protection authority in
                relation to your complaint.{" "}
              </Text>
              <Text>
                <strong>Unsubscribe:</strong> To unsubscribe from our email
                database or opt-out of communications (including marketing
                communications), please contact us using the details provided in
                this privacy policy, or opt-out using the opt-out facilities
                provided in the communication. We may need to request specific
                information from you to help us confirm your identity.{" "}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              Use of Cookies
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                {`We use 'cookies' to collect information about you
              and your activity across our site. A cookie is a small piece of
              data that our website stores on your computer, and accesses each
              time you visit, so we can understand how you use our site. This
              helps us serve you content based on preferences you have
              specified.`}
              </Text>
              <Text>
                Please refer to our Cookie Policy for more information.{" "}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              Business Transfers
            </Heading>
            <Text mt={3} mb={6}>
              If we or our assets are acquired, or in the unlikely event that we
              go out of business or enter bankruptcy, we would include data,
              including your personal information, among the assets transferred
              to any parties who acquire us. You acknowledge that such transfers
              may occur, and that any parties who acquire us may, to the extent
              permitted by applicable law, continue to use your personal
              information according to this policy, which they will be required
              to assume as it is the basis for any ownership or use rights we
              have over such information.{" "}
            </Text>

            <Heading as="h3" size="lg">
              Limits of Our Policy
            </Heading>
            <Text mt={3} mb={6}>
              Our website may link to external sites that are not operated by
              us. Please be aware that we have no control over the content and
              policies of those sites, and cannot accept responsibility or
              liability for their respective privacy practices.{" "}
            </Text>

            <Heading as="h3" size="lg">
              Changes to This Policy
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                At our discretion, we may change our privacy policy to reflect
                updates to our business processes, current acceptable practices,
                or legislative or regulatory changes. If we decide to change
                this privacy policy, we will post the changes here at the same
                link by which you are accessing this privacy policy.{" "}
              </Text>
              <Text>
                If the changes are significant, or if required by applicable
                law, we will contact you (based on your selected preferences for
                communications from us) and all our registered users with the
                new details and links to the updated or changed policy.{" "}
              </Text>
              <Text>
                If required by law, we will get your permission or give you the
                opportunity to opt in to or opt out of, as applicable, any new
                uses of your personal information.{" "}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              Additional Disclosures for Australian Privacy Act Compliance (AU)
            </Heading>
            <Heading as="h4" size="md" my={3}>
              International Transfers of Personal Information
            </Heading>
            <Text mt={3} mb={6}>
              Where the disclosure of your personal information is solely
              subject to Australian privacy laws, you acknowledge that some
              third parties may not be regulated by the Privacy Act and the
              Australian Privacy Principles in the Privacy Act. You acknowledge
              that if any such third party engages in any act or practice that
              contravenes the Australian Privacy Principles, it would not be
              accountable under the Privacy Act, and you will not be able to
              seek redress under the Privacy Act.{" "}
            </Text>

            <Heading as="h3" size="lg">
              Additional Disclosures for General Data Protection Regulation
              (GDPR) Compliance (EU)
            </Heading>
            <Heading as="h4" size="md" my={3}>
              Data Controller / Data Processor
            </Heading>
            <Text mt={3} mb={6}>
              The GDPR distinguishes between organisations that process personal
              information for their own purposes (known as &ldquo;data
              controllers&rdquo;) and organizations that process personal
              information on behalf of other organizations (known as &ldquo;data
              processors&rdquo;). We, GeoBuff, located at the address provided
              in our Contact Us section, are a Data Controller with respect to
              the personal information you provide to us.{" "}
            </Text>

            <Heading as="h4" size="md">
              Legal Bases for Processing Your Personal Information
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                We will only collect and use your personal information when we
                have a legal right to do so. In which case, we will collect and
                use your personal information lawfully, fairly and in a
                transparent manner. If we seek your consent to process your
                personal information, and you are under 16 years of age, we will
                seek your parent or legal guardian’s consent to process your
                personal information for that specific purpose.{" "}
              </Text>
              <Text>
                Our lawful bases depend on the services you use and how you use
                them. This means we only collect and use your information on the
                following grounds:{" "}
              </Text>
            </Stack>

            <Heading as="h5" size="sm">
              Consent From You
            </Heading>
            <Text mt={3} mb={6}>
              Where you give us consent to collect and use your personal
              information for a specific purpose. You may withdraw your consent
              at any time using the facilities we provide; however this will not
              affect any use of your information that has already taken place.
              You may consent to providing your name and contact details for the
              purpose of entering a giveaway or promotion. While you may
              withdraw your entry at any time, this will not affect any
              selection or judging that has already taken place. If you have any
              further enquiries about how to withdraw your consent, please feel
              free to enquire using the details provided in the Contact Us
              section of this privacy policy.{" "}
            </Text>

            <Heading as="h5" size="sm">
              Performance of a Contract or Transaction
            </Heading>
            <Text mt={3} mb={6}>
              Where you have entered into a contract or transaction with us, or
              in order to take preparatory steps prior to our entering into a
              contract or transaction with you. For example, if you purchase a
              product, service, or subscription from us, we may need to use your
              personal and payment information in order to process and deliver
              your order.{" "}
            </Text>

            <Heading as="h5" size="sm">
              Our Legitimate Interests
            </Heading>
            <Text mt={3} mb={6}>
              Where we assess it is necessary for our legitimate interests, such
              as for us to provide, operate, improve and communicate our
              services. We consider our legitimate interests to include research
              and development, understanding our audience, marketing and
              promoting our services, measures taken to operate our services
              efficiently, marketing analysis, and measures taken to protect our
              legal rights and interests.{" "}
            </Text>

            <Heading as="h5" size="sm">
              Compliance with Law
            </Heading>
            <Text mt={3} mb={6}>
              In some cases, we may have a legal obligation to use or keep your
              personal information. Such cases may include (but are not limited
              to) court orders, criminal investigations, government requests,
              and regulatory obligations. If you have any further enquiries
              about how we retain personal information in order to comply with
              the law, please feel free to enquire using the details provided in
              the Contact Us section of this privacy policy.{" "}
            </Text>

            <Heading as="h4" size="md">
              International Transfers Outside of the European Economic Area
              (EEA)
            </Heading>
            <Text mt={3} mb={6}>
              We will ensure that any transfer of personal information from
              countries in the European Economic Area (EEA) to countries outside
              the EEA will be protected by appropriate safeguards, for example
              by using standard data protection clauses approved by the European
              Commission, or the use of binding corporate rules or other legally
              accepted means.{" "}
            </Text>

            <Heading as="h4" size="md">
              Your Rights and Controlling Your Personal Information
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                <strong>Restrict:</strong> You have the right to request that we
                restrict the processing of your personal information if (i) you
                are concerned about the accuracy of your personal information;
                (ii) you believe your personal information has been unlawfully
                processed; (iii) you need us to maintain the personal
                information solely for the purpose of a legal claim; or (iv) we
                are in the process of considering your objection in relation to
                processing on the basis of legitimate interests.{" "}
              </Text>
              <Text>
                <strong>Objecting to processing:</strong> You have the right to
                object to processing of your personal information that is based
                on our legitimate interests or public interest. If this is done,
                we must provide compelling legitimate grounds for the processing
                which overrides your interests, rights, and freedoms, in order
                to proceed with the processing of your personal information.{" "}
              </Text>
              <Text>
                <strong>Data portability:</strong> You may have the right to
                request a copy of the personal information we hold about you.
                Where possible, we will provide this information in CSV format
                or other easily readable machine format. You may also have the
                right to request that we transfer this personal information to a
                third party.{" "}
              </Text>
              <Text>
                <strong>Deletion:</strong> You may have a right to request that
                we delete the personal information we hold about you at any
                time, and we will take reasonable steps to delete your personal
                information from our current records. If you ask us to delete
                your personal information, we will let you know how the deletion
                affects your use of our website or products and services. There
                may be exceptions to this right for specific legal reasons
                which, if applicable, we will set out for you in response to
                your request. If you terminate or delete your account, we will
                delete your personal information within 30 days of the deletion
                of your account. Please be aware that search engines and similar
                third parties may still retain copies of your personal
                information that has been made public at least once, like
                certain profile information and public comments, even after you
                have deleted the information from our services or deactivated
                your account.{" "}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              Additional Disclosures for California Compliance (US)
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                Under California Civil Code Section 1798.83, if you live in
                California and your business relationship with us is mainly for
                personal, family, or household purposes, you may ask us about
                the information we release to other organizations for their
                marketing purposes.{" "}
              </Text>
              <Text>
                To make such a request, please contact us using the details
                provided in this privacy policy with &ldquo;Request for
                California privacy information&rdquo; in the subject line. You
                may make this type of request once every calendar year. We will
                email you a list of categories of personal information we
                revealed to other organisations for their marketing purposes in
                the last calendar year along with their names and addresses. Not
                all personal information shared in this way is covered by
                Section 1798.83 of the California Civil Code.{" "}
              </Text>
            </Stack>

            <Heading as="h4" size="md">
              Do Not Track
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                Some browsers have a &ldquo;Do Not Track&rdquo; feature that
                lets you tell websites that you do not want to have your online
                activities tracked. At this time we do not respond to browser
                &ldquo;Do Not Track&rdquo; signals.{" "}
              </Text>
              <Text>
                We adhere to the standards outlined in this privacy policy
                ensuring we collect and process personal information lawfully,
                fairly, transparently and with legitimate, legal reasons for
                doing so.{" "}
              </Text>
            </Stack>

            <Heading as="h4" size="md">
              Cookies and Pixels
            </Heading>
            <Text mt={3} mb={6}>
              At all times you may decline cookies from our site if your browser
              permits. Most browsers allow you to activate settings on your
              browser to refuse the setting of all or some cookies. Accordingly,
              your ability to limit cookies is based only on your browser’s
              capabilities. Please refer to the Cookies section of this privacy
              policy for more information.{" "}
            </Text>

            <Heading as="h4" size="md">
              CCPA-permitted financial incentives
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                In accordance with your right to non-discrimination, we may
                offer you certain financial incentives permitted by the CCPA
                that can result in different prices, rates, or quality levels
                for the goods or services we provide.{" "}
              </Text>
              <Text>
                Any CCPA-permitted financial incentive we offer will reasonably
                relate to the value of your personal information and we will
                provide written terms that describe clearly the nature of such
                an offer. Participation in a financial incentive program
                requires your prior opt-in consent, which you may revoke at any
                time.{" "}
              </Text>
            </Stack>

            <Heading as="h4" size="md">
              California Notice of Collection
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                In the past 12 months, we have collected the following
                categories of personal information enumerated in the California
                Consumer Privacy Act:{" "}
              </Text>
              <Text>
                For more information on information we collect, including the
                sources we receive information from, review the
                &ldquo;Information We Collect&rdquo; section. We collect and use
                these categories of personal information for the business
                purposes described in the &ldquo;Collection and Use of
                Information&rdquo; section, including to provide and manage our
                Service.{" "}
              </Text>
            </Stack>

            <Heading as="h4" size="md">
              Right to Know and Delete
            </Heading>
            <Text my={3}>
              If you are a California resident, you have rights to delete your
              personal information we collected and know certain information
              about our data practices in the preceding 12 months. In
              particular, you have the right to request the following from us:{" "}
            </Text>
            <UnorderedList>
              <ListItem>
                The categories of personal information we have collected about
                you;
              </ListItem>
              <ListItem>
                The categories of sources from which the personal information
                was collected;
              </ListItem>
              <ListItem>
                The categories of personal information about you we disclosed
                for a business purpose or sold;
              </ListItem>
              <ListItem>
                The categories of third parties to whom the personal information
                was disclosed for a business purpose or sold;
              </ListItem>
              <ListItem>
                The business or commercial purpose for collecting or selling the
                personal information; and
              </ListItem>
              <ListItem>
                The specific pieces of personal information we have collected
                about you.
              </ListItem>
            </UnorderedList>
            <Text mt={3} mb={6}>
              To exercise any of these rights, please contact us using the
              details provided in this privacy policy.{" "}
            </Text>

            <Heading as="h4" size="md">
              Shine the Light
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                If you are a California resident, in addition to the rights
                discussed above, you have the right to request information from
                us regarding the manner in which we share certain personal
                information as defined by California’s &ldquo;Shine the
                Light&rdquo; with third parties and affiliates for their own
                direct marketing purposes.{" "}
              </Text>
              <Text>
                To receive this information, send us a request using the contact
                details provided in this privacy policy. Requests must include
                &ldquo;California Privacy Rights Request&rdquo; in the first
                line of the description and include your name, street address,
                city, state, and ZIP code.{" "}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              Contact Us
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                For any questions or concerns regarding your privacy, you may
                contact us using the following details:{" "}
              </Text>
              <Text>Ashley Midgley</Text>
              <Text>teamgeobuff@gmail.com </Text>
            </Stack>
          </Box>
        </Box>
      </Box>
    </MainView>
  );
};

export default PrivacyPolicy;
