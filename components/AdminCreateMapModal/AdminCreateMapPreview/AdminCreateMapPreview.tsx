import React, { FC, useState } from "react";

import { SVGBase, SVGMap } from "@geobuff/buff-ui/components";

import { Button, Flex, Tooltip } from "@chakra-ui/react";

import { getMapStyles } from "../../../helpers/map";

export interface Props {
  svgMap?: SVGBase;
  onNextPage?: () => void;
  onClose?: () => void;
}

const AdminCreateMapPreview: FC<Props> = ({
  svgMap = null,
  onNextPage = (): void => {},
  onClose = (): void => {},
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipText, setTooltipText] = useState("");

  const mouseOver = (event: React.MouseEvent<SVGElement>): void => {
    setTooltipText(event.currentTarget.getAttribute("name"));
  };

  const mouseMove = (event: React.MouseEvent<SVGElement>): void => {
    if (!tooltipText) return;
    setTooltipOpen(true);
    setTooltipTop(event.clientY + 10);
    setTooltipLeft(event.clientX - 100);
  };

  const mouseOut = (): void => {
    setTooltipText(null);
    setTooltipOpen(false);
  };

  if (!svgMap) {
    return null;
  }

  return (
    <Flex direction="column">
      <Tooltip
        label={tooltipText}
        position="absolute"
        top={tooltipTop}
        left={tooltipLeft}
        isOpen={tooltipOpen}
      >
        <SVGMap
          map={svgMap}
          mapStyle={getMapStyles(svgMap?.className)}
          onPathMouseOver={mouseOver}
          onPathMouseMove={mouseMove}
          onPathMouseOut={mouseOut}
        />
      </Tooltip>
      <Flex mt={6} justifyContent="right">
        <Button onClick={onClose} mr={3}>
          Close
        </Button>
        <Button onClick={onNextPage} colorScheme="teal">
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminCreateMapPreview;
