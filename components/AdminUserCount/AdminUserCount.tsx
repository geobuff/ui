import React, { FC } from "react";

import { Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface Props {
  data?: any[];
}

const AdminUserCount: FC<Props> = ({ data = [] }) => {
  const width = useBreakpointValue({ base: 300, md: 1200 });

  return (
    <Flex
      margin={6}
      padding={12}
      background="white"
      borderRadius={12}
      justifyContent="center"
    >
      <Flex direction="column">
        <Heading size="md" marginBottom={6}>
          Total Users
        </Heading>
        <LineChart width={width} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="Count" stroke="#3182CE" />
        </LineChart>
      </Flex>
    </Flex>
  );
};

export default AdminUserCount;
