import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

import AdminQuizzesContainer from "../../containers/AdminQuizzesContainer";
import AdminUsersContainer from "../../containers/AdminUsersContainer";
import AdminTotalUserCountContainer from "../../containers/AdminTotalUserCountContainer";
import AdminDiscountsContainer from "../../containers/AdminDiscountsContainer";
import AdminTopFiveQuizPlaysContainer from "../../containers/AdminTopFiveQuizPlaysContainer";
import AdminOrdersContainer from "../../containers/AdminOrdersContainer";
import AdminLastWeekTriviaPlaysContainer from "../../containers/AdminLastWeekTriviaPlaysContainer";

const AdminContainer: FC = () => {
  return (
    <Flex justifyContent="center">
      <Flex direction="column" height="100%" width="100%" maxWidth={1300}>
        <AdminTotalUserCountContainer />
        <AdminTopFiveQuizPlaysContainer />
        <AdminLastWeekTriviaPlaysContainer />
        <AdminUsersContainer />
        <AdminQuizzesContainer />
        <AdminOrdersContainer />
        <AdminDiscountsContainer />
      </Flex>
    </Flex>
  );
};

export default AdminContainer;
