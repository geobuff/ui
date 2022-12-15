import React, { FC, useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import { Box, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import TeamMemberCard from "../components/TeamMemberCard/TeamMemberCard";

const MeetTheTeam: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.meetTheTeam} - GeoBuff`}</title>
        <meta
          name="description"
          content="Meet the team of Geography nerds building GeoBuff and learn how to get in touch if you're interested in joining."
        />
      </Head>
      <HeroHeader heading={t.global.meetTheTeam} />
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
              position={t.team.founder}
              city="Wellington"
              country={t.team.nz}
              primaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/ash-primary.svg`}
              secondaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/ash-secondary.svg`}
              link="https://www.linkedin.com/in/ashley-midgley-68586b244"
            />
            <TeamMemberCard
              title="Pearl Pan"
              position={t.team.marketing}
              city="Auckland"
              country={t.team.nz}
              primaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/pearl-primary.svg`}
              secondaryImageUrl={`${process.env.NEXT_PUBLIC_CDN_URL}/team/pearl-secondary.svg`}
              link="https://www.linkedin.com/in/pearl-pan/"
            />
          </SimpleGrid>
        </Box>
        <Box width={{ base: "90%", md: 600 }} mx="auto" mb={12}>
          <Heading size="md" mb={6}>
            {t.team.joinTitle}
          </Heading>
          <Text mb={3}>{t.team.joinExplainerOne}</Text>
          <Text>
            {`${t.team.joinExplainerTwo} `}
            <Link href="mailto: teamgeobuff@gmail.com">
              teamgeobuff@gmail.com
            </Link>
            {`.`}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default MeetTheTeam;
