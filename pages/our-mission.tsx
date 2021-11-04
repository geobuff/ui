import React, { FC } from "react";
import Head from "next/head";
import { Box, Divider, Text, Link, SimpleGrid } from "@chakra-ui/react";

import TeamMemberCard from "../components/TeamMemberCard/TeamMemberCard";
import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import QuestionMark from "../components/QuestionMark";
import Earth from "../components/Earth";

const OurMission: FC = () => (
  <MainView>
    <Head>
      <title>Our Mission - GeoBuff</title>
    </Head>
    <HeroHeader heading="Our Mission" />
    <Box background="white">
      <Box
        maxWidth={{ base: "80%", md: "50%" }}
        mx="auto"
        py={9}
        fontSize={{ base: "12px", md: "inherit" }}
      >
        <Box mx="auto" mt={3}>
          <Box
            mb={12}
            maxWidth={{ base: "100%", md: "450px" }}
            mx="auto"
            lineHeight="28px"
          >
            <Box mb={6}>
              <QuestionMark height="75" width="100%" />
            </Box>
            <Text
              fontSize="18px"
              fontWeight="bold"
              textAlign="center"
              mx="auto"
            >
              Create something that makes it easier for people to learn the
              countries and flags of the world
            </Text>
          </Box>
          <Box
            mb={24}
            maxWidth={{ base: "100%", md: "450px" }}
            mx="auto"
            lineHeight="28px"
          >
            <Box mb={6}>
              <Earth height="75" width="100%" />
            </Box>
            <Text
              fontSize="18px"
              fontWeight="bold"
              textAlign="center"
              mx="auto"
            >
              Share open source{" "}
              <Link href="https://github.com/geobuff/svg-map" color="teal.500">
                map
              </Link>
              ,{" "}
              <Link href="https://github.com/geobuff/svg-maps" color="teal.500">
                maps
              </Link>
              ,{" "}
              <Link href="https://github.com/geobuff/mapping" color="teal.500">
                mapping
              </Link>{" "}
              and{" "}
              <Link href="https://github.com/geobuff/flags" color="teal.500">
                flag
              </Link>{" "}
              libraries so that others can build off of our resources
            </Text>
          </Box>
          <Box color="#828282" fontSize="15px" mb={24}>
            <Text mb={3}>
              {`"Technology may seem to overcome the distances between us in both mental and physical space, but it is easy to forget that the land where we live, work and raise our children is hugely important, and that the choices of those who lead the seven billion inhabitants of this planet will to some degree always be shaped by the rivers, mountains, deserts, lakes and seas that constrain us all – as they always have."`}
            </Text>
            <Text>{"- Tim Marshall, Prisoners of Geography"}</Text>
          </Box>
        </Box>
        <Box mb={12}>
          <Text textAlign="center" my={6} fontSize="48px" fontWeight="black">
            Our Team
          </Text>
          <Divider />
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: "50px", lg: "inherit" }}
            mt={12}
          >
            <TeamMemberCard
              title="Ash Midgley"
              position="Founder"
              city="Wellington"
              country="New Zealand"
              imageUrl="/ash.jpg"
              link="https://github.com/ashmidgley"
            />
            <TeamMemberCard
              title="Kirby McKenzie"
              position="Founder"
              city="Melbourne"
              country="Australia"
              imageUrl="/kirby.jpeg"
              link="https://github.com/KirbyMcKenzie"
            />
            <TeamMemberCard
              title="Daniel Marchbank"
              position="Designer"
              city="Wellington"
              country="New Zealand"
              imageUrl="/dan.jpg"
              link="https://github.com/danielmarchbank"
            />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  </MainView>
);

export default OurMission;
