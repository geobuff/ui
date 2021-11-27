import React, { FC } from "react";
import {
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ListItem,
  OrderedList,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

const FAQSection: FC = () => (
  <Accordion allowMultiple>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {"How do I change my avatar, username, email or country?"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <OrderedList spacing={6} mb={6}>
          <ListItem>Ensure you are logged in.</ListItem>
          <ListItem>
            Navigate to your user profile by using the navigation drop down and
            selecting profile (or{" "}
            <Link href="/profile">
              <ChakraLink>click here</ChakraLink>
            </Link>
            ).
          </ListItem>
          <ListItem>
            Select the pencil icon at the top right of the first tile.
          </ListItem>
          <ListItem>Update your details in the form and click Submit.</ListItem>
        </OrderedList>
        <Text>
          Your updated details should now correctly display in the first tile.
        </Text>
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {"I've forgot my password. What do I do now?"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>
          <Link href="/forgot-password">
            <ChakraLink>Click here</ChakraLink>
          </Link>{" "}
          to navigate to the password reset form. Once you have submitted your
          email address you will receive an email with instructions on how to
          reset your password.
        </Text>
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {"How do I report a player?"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        If you see a player in the leaderboard with a username that is offensive
        and/or breaks the rules of our{" "}
        <Link href="/terms-of-service">
          <ChakraLink>Terms of Service</ChakraLink>
        </Link>
        , please create a support request above and include the username in the
        message so the team can begin an investigation.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {"Where do I suggest corrections to existing quiz results?"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Please submit a support request above specifying the quiz name and the
        the amendment you believe we should make to the results.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {"What is GeoCoin?"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        GeoCoin is our in game currency that allows you to purchase items,
        avatars and subscriptions. You earn GeoCoin each time you score greater
        than 0 on a quiz. The amount of coins you earn scales based on how well
        you do in comparison to the max score for the quiz.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default FAQSection;
