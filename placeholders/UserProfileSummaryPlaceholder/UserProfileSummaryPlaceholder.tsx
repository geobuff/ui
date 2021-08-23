import React, { FC } from "react";
import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

import Card from "../../components/Card";

const UserProfileSummaryPlaceholder: FC = () => {
  return (
    <Card padding={6}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={6}
      >
        <SkeletonCircle
          height="130px"
          width="130px"
          marginTop="-80px"
          marginBottom={6}
        />

        <Skeleton marginTop={3} marginBottom={1} height="32px" width="225px" />
        <Skeleton marginY={2} height="16px" width="200px" />
        <Skeleton marginY={2} height="16px" width="125px" />

        <Skeleton marginTop={6} height="20px" width="85%" />
      </Flex>
    </Card>
  );
};

export default UserProfileSummaryPlaceholder;
