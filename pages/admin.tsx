import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AuthUser } from "../types/auth-user";
import GameSpinner from "../components/GameSpinner";

const AdminTotalUserCountContainer = dynamic(
  () => import("../containers/AdminTotalUserCountContainer")
);

const AdminUsersContainer = dynamic(
  () => import("../containers/AdminUsersContainer")
);

const AdminTopFiveQuizPlaysContainer = dynamic(
  () => import("../containers/AdminTopFiveQuizPlaysContainer")
);

const AdminLastWeekTriviaPlaysContainer = dynamic(
  () => import("../containers/AdminLastWeekTriviaPlaysContainer")
);

const AdminQuizTableContainer = dynamic(
  () => import("../containers/AdminQuizTableContainer")
);

const AdminOrdersContainer = dynamic(
  () => import("../containers/AdminOrdersContainer")
);

const AdminDiscountsTableContainer = dynamic(
  () => import("../containers/AdminDiscountsTableContainer")
);

const AdminMerchTableContainer = dynamic(
  () => import("../containers/AdminMerchTableContainer")
);

const AdminGeneralContainer = dynamic(
  () => import("../containers/AdminGeneralContainer")
);

const AdminManualTriviaQuestionTableContainer = dynamic(
  () => import("../containers/AdminManualTriviaQuestionTableContainer")
);

const AdminFlagsTableContainer = dynamic(
  () => import("../containers/AdminFlagsTableContainer")
);

const AdminMapsTableContainer = dynamic(
  () => import("../containers/AdminMapsTableContainer")
);

const AdminCreateMapContainer = dynamic(
  () => import("../containers/AdminCreateMapContainer")
);

const AdminMappingsTableContainer = dynamic(
  () => import("../containers/AdminMappingsTableContainer")
);

const tabs = [
  "general",
  "users",
  "quizzes",
  "trivia",
  "merch",
  "flags",
  "maps",
  "mappings",
];

export default function Admin(): JSX.Element {
  const { data: session, status } = useSession();
  const user = session?.user as AuthUser;

  const [tabIndex, setTabIndex] = useState(0);

  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (tab) {
      setTabIndex(tabs.indexOf(tab as string));
    }
  }, [tab]);

  const handleTabsChange = (index: number): void => {
    router.push({
      query: {
        tab: tabs[index],
      },
    });
  };

  if (status === "loading") {
    return <GameSpinner />;
  }

  return (
    <>
      <Head>
        <title>{"Admin Dashboard - GeoBuff"}</title>
      </Head>
      <MainView hasFooter>
        <Tabs
          isLazy
          colorScheme="teal"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <Flex
            position="fixed"
            left={0}
            right={0}
            backgroundColor="white"
            zIndex={100}
            borderTop={"1.5px solid #E2E8F0"}
          >
            <TabList width="100%" paddingX={{ base: 3, md: 5 }}>
              <Tab fontWeight="medium">General</Tab>
              <Tab fontWeight="medium">Users</Tab>
              <Tab fontWeight="medium">Quizzes</Tab>
              <Tab fontWeight="medium">Trivia</Tab>
              <Tab fontWeight="medium">Merch</Tab>
              <Tab fontWeight="medium">Flags</Tab>
              <Tab fontWeight="medium">Maps</Tab>
              <Tab fontWeight="medium">Mappings</Tab>
            </TabList>
          </Flex>

          <TabPanels mt={10}>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminGeneralContainer />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminTotalUserCountContainer />
                  <AdminUsersContainer />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminTopFiveQuizPlaysContainer />
                  <AdminQuizTableContainer />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminLastWeekTriviaPlaysContainer />
                  <AdminManualTriviaQuestionTableContainer />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminMerchTableContainer />
                  <AdminDiscountsTableContainer />
                  <AdminOrdersContainer />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminFlagsTableContainer />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminCreateMapContainer />
                  <AdminMapsTableContainer />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  maxWidth={1300}
                >
                  <AdminMappingsTableContainer />
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MainView>
    </>
  );
}

Admin.requireAuth = true;
