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

const AdminLastWeekTriviaPlays: FC<Props> = ({ data = [] }) => {
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
          Trivia Plays
        </Heading>
        <LineChart width={width} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="Plays" stroke="#3182CE" />
        </LineChart>
      </Flex>
    </Flex>
  );
};

export default AdminLastWeekTriviaPlays;
