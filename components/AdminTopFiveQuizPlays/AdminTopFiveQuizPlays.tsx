import React, { FC } from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

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
      <BarChart width={width} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="Plays" fill="#48BB78" maxBarSize={50} />
      </BarChart>
    </Flex>
  );
};

export default AdminTopFiveQuizPlays;
