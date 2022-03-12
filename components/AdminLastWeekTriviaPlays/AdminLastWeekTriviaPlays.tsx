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
import Card from "../Card";

export interface Props {
  data?: any[];
}

const AdminLastWeekTriviaPlays: FC<Props> = ({ data = [] }) => {
  const width = useBreakpointValue({ base: 400, sm: 600, md: 1200 });

  return (
    <Card marginTop={10} padding={6}>
      <Flex direction="column" overflowY={"scroll"}>
        <Heading size="md" marginBottom={7}>
          {"Trivia Plays"}
        </Heading>
        <LineChart width={width} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="Plays" stroke="#3182CE" />
        </LineChart>
      </Flex>
    </Card>
  );
};

export default AdminLastWeekTriviaPlays;
