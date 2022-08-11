import React, { FC, useState } from "react";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import Modal from "../../Modal";
import { SVGMap } from "@geobuff/svg-map";
import { getMapStyles } from "../../../helpers/map";
import { SVGBase } from "../../../types/svg-base";

export interface Props {
  svgMap?: SVGBase;
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminCreateMapModal: FC<Props> = ({
  svgMap = null,
  isOpen = false,
  onClose = (): void => {},
}) => {
  const [page, setPage] = useState(1);
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);

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

  const handleBack = (): void => {
    if (page === 1) {
      onClose();
      return;
    }

    setPage(1);
  };

  const handleSubmit = (): void => {
    if (page === 1) {
      setPage(2);
      return;
    }

    console.log("submitted");
  };

  const footer = (
    <Flex>
      <Button onClick={handleBack}>{page === 2 ? "Back" : "Close"}</Button>
      <Button colorScheme="teal" onClick={handleSubmit} ml={3}>
        {page === 2 ? "Submit" : "Next"}
      </Button>
    </Flex>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxHeight={{ base: "100%", md: "700px" }}
      minWidth="660px"
      footer={footer}
    >
      <Flex direction="column" padding={12}>
        {page === 1 ? (
          <>
            {svgMap && (
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
            )}
          </>
        ) : (
          <Flex>{`Max Score: ${svgMap.elements.length}`}</Flex>
        )}
      </Flex>
    </Modal>
  );
};

export default AdminCreateMapModal;
