import React from "react";
import Head from "next/head";
import {
  Box,
  Text,
  Heading,
  Divider,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";

const PrivacyPolicy = () => (
  <MainView>
    <Head>
      <title>Privacy Policy - GeoBuff</title>
    </Head>
    <Box>
      <HeroHeader heading="Privacy Policy" />
      <Box background="white">
        <Box
          maxWidth={{ base: "80%", md: "50%" }}
          mx="auto"
          py={12}
          fontSize={{ base: "12px", md: "inherit" }}
        >
          <Heading mb={3} textAlign="center" size="lg">
            Nemtatiuntus coratiosam
          </Heading>
          <Divider />
          <Text my={3} fontWeight="bold">
            Ulpa nobis et voluptatur. Qui re volescid molorumquis volut plab
            iusa cum iunto cus verit, cum am duciur acesequ aecullit essit
            ellupta temporat apel enia prepeditaque labor alit.
          </Text>
          <OrderedList>
            <ListItem my={3}>
              <Text fontWeight="bold">
                Nem eniet ulparunto vene volor solest
              </Text>
              <Text color="#828282">
                Unditas et magnam est, offic tendi doluptate sunda quunda id
                quam nossinciat ad excessi dolo evel iusam nulleni scienda
                ditius everum volumen dipsam et ex exerfer sperovid utem qui
                aspelectatis as consero officatem que dolessi tatiuntus
                coratiosam qui is dolestrum, explanda con eaqui ipsapedit
                dolorem il enem as evendiore nonseni hitaqui sapis plab intur.
                Ratibea volection res nus, vidunt hillabo.
              </Text>
            </ListItem>
            <ListItem my={3}>
              <Text fontWeight="bold">
                Nem eniet ulparunto vene volor solest
              </Text>
              <Text color="#828282">
                Unditas et magnam est, offic tendi doluptate sunda quunda id
                quam nossinciat ad excessi dolo evel iusam nulleni scienda
                ditius everum volumen dipsam et ex exerfer sperovid utem qui
                aspelectatis as consero officatem que dolessi tatiuntus
                coratiosam qui is dolestrum, explanda con eaqui ipsapedit
                dolorem il enem as evendiore nonseni hitaqui sapis plab intur.
                Ratibea volection res nus, vidunt hillabo.
              </Text>
            </ListItem>
            <ListItem my={3}>
              <Text fontWeight="bold">
                Nem eniet ulparunto vene volor solest
              </Text>
              <Text color="#828282">
                Unditas et magnam est, offic tendi doluptate sunda quunda id
                quam nossinciat ad excessi dolo evel iusam nulleni scienda
                ditius everum volumen dipsam et ex exerfer sperovid utem qui
                aspelectatis as consero officatem que dolessi tatiuntus
                coratiosam qui is dolestrum, explanda con eaqui ipsapedit
                dolorem il enem as evendiore nonseni hitaqui sapis plab intur.
                Ratibea volection res nus, vidunt hillabo.
              </Text>
            </ListItem>
            <ListItem my={3}>
              <Text fontWeight="bold">
                Nem eniet ulparunto vene volor solest
              </Text>
              <Text color="#828282">
                Unditas et magnam est, offic tendi doluptate sunda quunda id
                quam nossinciat ad excessi dolo evel iusam nulleni scienda
                ditius everum volumen dipsam et ex exerfer sperovid utem qui
                aspelectatis as consero officatem que dolessi tatiuntus
                coratiosam qui is dolestrum, explanda con eaqui ipsapedit
                dolorem il enem as evendiore nonseni hitaqui sapis plab intur.
                Ratibea volection res nus, vidunt hillabo.
              </Text>
            </ListItem>
          </OrderedList>
        </Box>
      </Box>
    </Box>
  </MainView>
);

export default PrivacyPolicy;
