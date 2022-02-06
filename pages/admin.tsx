import React, { FC } from "react";
import Head from "next/head";

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import AdminTotalUserCountContainer from "../containers/AdminTotalUserCountContainer";
import AdminUsersContainer from "../containers/AdminUsersContainer";
import AdminTopFiveQuizPlaysContainer from "../containers/AdminTopFiveQuizPlaysContainer";
import AdminLastWeekTriviaPlaysContainer from "../containers/AdminLastWeekTriviaPlaysContainer";
import AdminQuizzesContainer from "../containers/AdminQuizzesContainer";
import AdminOrdersContainer from "../containers/AdminOrdersContainer";
import AdminDiscountsContainer from "../containers/AdminDiscountsContainer";
import AdminGeneralContainer from "../containers/AdminGeneralContainer";
import AdminCreateQuizContainer from "../containers/AdminCreateQuizContainer";

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
