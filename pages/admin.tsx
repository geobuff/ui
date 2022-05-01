import React, { FC, useContext, useEffect, useState } from "react";
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
import { CurrentUserContext } from "../context/CurrentUserContext";
import Custom404 from "./404";

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

const tabs = ["general", "users", "quizzes", "trivia", "merch"];

const Admin: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { user } = useContext(CurrentUserContext);

  const router = useRouter();
  const { tab } = router.query;

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

  return (
    <>
      <Head>
        <title>{"Admin Dashboard - GeoBuff"}</title>
      </Head>
      <MainView hasFooter={user?.isAdmin}>
        {!user?.isAdmin ? (
          <Custom404 />
        ) : (
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
            </TabPanels>
          </Tabs>
        )}
      </MainView>
    </>
  );
};

export default Admin;
