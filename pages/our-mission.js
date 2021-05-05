import React from "react";
import {
  Box,
  Divider,
  Heading,
  Text,
  Link,
  ListItem,
  ListIcon,
  List,
  Alert,
  SimpleGrid,
} from "@chakra-ui/react";
import { SunIcon, UnlockIcon } from "@chakra-ui/icons";

import TeamMemberCard from "../components/TeamMemberCard/TeamMemberCard";
import MainView from "../components/MainView";

const OurMission = () => (
  <MainView>
    <Box m={5}>
      <Box
        borderRadius={12}
        p={5}
        background="#FFFFFF"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
      >
        <Box>
          <Box mb={6}>
            <Text mb={6}>Our mission is twofold:</Text>
            <List>
              <ListItem mb={6}>
                <ListIcon as={SunIcon} color="green.500" />
                Create a quiz for every country in the world.
              </ListItem>
              <ListItem>
                <ListIcon as={UnlockIcon} color="green.500" />
                Build open source{" "}
                <Link href="https://github.com/geobuff/maps" color="teal.500">
                  map
                </Link>
                ,{" "}
                <Link
                  href="https://github.com/geobuff/mapping"
                  color="teal.500"
                >
                  mapping
                </Link>{" "}
                and{" "}
                <Link href="https://github.com/geobuff/flags" color="teal.500">
                  flag
                </Link>{" "}
                libraries so that others can build off of our resources.
              </ListItem>
            </List>
          </Box>
          <Alert
            status="warning"
            borderLeftWidth="4px"
            borderLeftColor="orange.500"
            borderRadius="4px"
            my={6}
          >
            <Box>
              {`"Technology may seem to overcome the distances between us in both mental and physical space, but it is easy to forget that the land where we live, work and raise our children is hugely important, and that the choices of those who lead the seven billion inhabitants of this planet will to some degree always be shaped by the rivers, mountains, deserts, lakes and seas that constrain us all – as they always have."`}
              <Text textAlign="right">
                {"- Tim Marshall, Prisoners of Geography"}
              </Text>
            </Box>
          </Alert>
        </Box>
        <Divider />
        <Box>
          <Heading textAlign="center" my={6}>
            The Team
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            spacing={9}
            p={{ base: 2, sm: 6 }}
          >
            <TeamMemberCard
              title="Ash Midgley"
              position="Founder"
              location="Wellington, New Zealand"
              imageUrl="/ash.jpg"
              link="https://github.com/ashmidgley"
            />
            <TeamMemberCard
              title="Kirby McKenzie"
              position="Founder"
              location="Melbourne, Australia"
              imageUrl="/kirby.jpeg"
              link="https://github.com/KirbyMcKenzie"
            />
            <TeamMemberCard
              title="Daniel Marchbank"
              position="UI Developer"
              location="Wellington, New Zealand"
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
