import React, { FC, useState, MouseEventHandler } from "react";
import { Box, BoxProps, Image } from "@chakra-ui/react";

export interface Props extends BoxProps {
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  name?: string;
  height?: number;
  width?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  shape?: "circle" | "square";
  hasBorder?: boolean;
}

const ProfileUserAvatar: FC<Props> = ({
  primaryImageUrl,
  secondaryImageUrl,
  onClick,
  name,
  height = 130,
  width = 130,
  shape = "circle",
  hasBorder = true,
  ...props
}) => {
  const [shouldShowSecondary, setShouldShowSecondary] = useState(false);

  const isSquare = shape === "square";

  return (
    <Box
      alignItems="center"
      borderRadius={isSquare ? "8px" : "100%"}
      backgroundColor="#276f86"
      border={hasBorder ? "solid 5px #1A202C" : "none"}
      padding={3}
      height={height}
      width={width}
      marginBottom={2}
      overflow="hidden"
      marginX="auto"
      cursor="pointer"
      onMouseEnter={(): void => setShouldShowSecondary(true)}
      onMouseOut={(): void => setShouldShowSecondary(false)}
      zIndex={2}
      onClick={onClick}
      {...props}
    >
      <Image
        display={shouldShowSecondary ? "none" : "inherit"}
        src={primaryImageUrl}
        alt={`${name} avatar looking away`}
        marginTop={0.5}
        height={height - 24}
        width={width - 24}
      />
      <Image
        display={shouldShowSecondary ? "inherit" : "none"}
        src={secondaryImageUrl}
        alt={`${name} avatar looking dead straight`}
        marginTop={0.5}
        height={height - 24}
        width={width - 24}
        onMouseEnter={(): void => setShouldShowSecondary(true)}
      />
    </Box>
  );
};

export default ProfileUserAvatar;
