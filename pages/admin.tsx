import React, { FC } from "react";
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

const AdminQuizzesContainer = dynamic(
  () => import("../containers/AdminQuizzesContainer")
);

const AdminOrdersContainer = dynamic(
  () => import("../containers/AdminOrdersContainer")
);

const AdminDiscountsContainer = dynamic(
  () => import("../containers/AdminDiscountsContainer")
);

const AdminGeneralContainer = dynamic(
  () => import("../containers/AdminGeneralContainer")
);

const AdminCreateQuizContainer = dynamic(
  () => import("../containers/AdminCreateQuizContainer")
);

const Admin: FC = () => (
  <>
    <Head>
      <title>{"Admin Dashboard - GeoBuff"}</title>
    </Head>
    <MainView>
      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Users</Tab>
          <Tab>Quizzes</Tab>
          <Tab>Trivia</Tab>
          <Tab>Orders</Tab>
        </TabList>

        <TabPanels>
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
                <AdminQuizzesContainer />
                <AdminCreateQuizContainer />
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
                <AdminOrdersContainer />
                <AdminDiscountsContainer />
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainView>
  </>
);

export default Admin;
