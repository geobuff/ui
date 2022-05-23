import React, { FC } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

interface Props {
  height?: number;
  width?: number;
  fill?: string;
}

const VerifiedTick: FC<Props> = ({
  height = 25,
  width = 25,
  fill = "#276F86",
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <svg
      height={height}
      width={width}
      style={{ float: "left", marginRight: !isMobile && "4px" }}
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.959 17-4.5-4.319 1.395-1.435 3.08 2.937L17.037 7l1.422 1.409L10.041 17z"
        fill={fill}
      />
    </svg>
  );
};

export default VerifiedTick;
