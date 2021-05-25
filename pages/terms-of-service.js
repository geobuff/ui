import React from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Fade,
  Text,
  Heading,
  Divider,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

import MainView from "../components/MainView";

const TermsOfService = () => (
  <MainView>
    <Head>
      <title>Terms of Service - GeoBuff</title>
    </Head>
    <Box>
      <Box
        role="banner"
        background="linear-gradient(90deg, #27AE60 0%, #219250 100%)"
        height={{ base: "130px", md: "200px" }}
        width="100%"
      >
        <Box
          height="100%"
          background={"url(/world-map.svg)"}
          backgroundRepeat="no-repeat"
          backgroundSize={{ base: "600px 300px", md: "1200px 475px" }}
          backgroundPosition="center top 2px"
        >
          <Flex
            direction="column"
            padding={[3, 6, 12]}
            height="100%"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Fade in>
              <Text
                color="white"
                fontSize={["38px", "42px", "56px"]}
                fontWeight="black"
                lineHeight={{ base: "1.1", md: "1" }}
              >
                {"Terms of Service"}
              </Text>
            </Fade>
          </Flex>
        </Box>
      </Box>
      <Box background="white">
        <Box maxWidth={{ base: "90%", md: "50%" }} mx="auto" py={12}>
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

export default TermsOfService;
