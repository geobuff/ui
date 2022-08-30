import React, { FC } from "react";
import Head from "next/head";
import { Box, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";

import TeamMemberCard from "../components/TeamMemberCard/TeamMemberCard";
import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";

const MeetTheTeam: FC = () => (
  <MainView>
    <Head>
      <title>The Team - GeoBuff</title>
      <meta
        name="description"
        content="Meet the team of Geography nerds building GeoBuff and learn how to get in touch if you're interested in joining."
      />
    </Head>
    <HeroHeader heading="Meet the Team" />
    <Box background="white">
      <Box
        maxWidth={{ base: "80%", md: "50%" }}
        mx="auto"
        py={9}
        fontSize={{ base: "12px", md: "inherit" }}
        mb={12}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingY={{ base: 6, md: 12 }}
          mt={12}
        >
          <TeamMemberCard
            title="Ash Midgley"
            position="Founder"
            city="Wellington"
            country="New Zealand"
            primaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/ash-primary.svg`}
            secondaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/ash-secondary.svg`}
            link="https://www.linkedin.com/in/ashley-midgley-68586b244"
          />
          <TeamMemberCard
            title="Pearl Pan"
            position="Marketing"
            city="Melbourne"
            country="Australia"
            primaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/pearl-primary.svg`}
            secondaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/pearl-secondary.svg`}
            link="https://www.linkedin.com/in/pearl-pan/"
          />
        </SimpleGrid>
      </Box>
      <Box width={{ base: "90%", md: 600 }} mx="auto" mb={12}>
        <Heading size="md" mb={6}>{`Interested in joining?`}</Heading>
        <Text
          mb={3}
        >{`We're on the lookout for researchers that can help us generate more trivia questions, writers that want to create content for our blog or admin machines that want to assist in parsing SVG's so we can generate more quizzes.`}</Text>
        <Text>
          {`If this sounds like you, flick us a line at `}
          <Link href="mailto: teamgeobuff@gmail.com">
            teamgeobuff@gmail.com
          </Link>
          {`.`}
        </Text>
      </Box>
    </Box>
  </MainView>
);

export default MeetTheTeam;
