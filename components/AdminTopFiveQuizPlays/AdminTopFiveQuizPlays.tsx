import React, { FC } from "react";

import { Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export interface Props {
  data?: any[];
}

const AdminTopFiveQuizPlays: FC<Props> = ({ data = [] }) => {
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
          Quiz Plays
        </Heading>
        <BarChart width={width} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="Plays" fill="#48BB78" maxBarSize={50} />
        </BarChart>
      </Flex>
    </Flex>
  );
};

export default AdminTopFiveQuizPlays;
