import React, { FC, useState, MouseEventHandler } from "react";
import { Flex, Image } from "@chakra-ui/react";

export interface Props {
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  name?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const ProfileUserAvatar: FC<Props> = ({
  onClick,
  primaryImageUrl,
  secondaryImageUrl,
  name,
}) => {
  const [shouldShowSecondary, setShouldShowSecondary] = useState(false);

  return (
    <Flex
      alignItems="center"
      borderRadius="100%"
      backgroundColor="#276f86"
      border="solid 5px #1A202C"
      padding={3}
      height="130px"
      width="130px"
      marginTop="-122px"
      marginBottom={2}
      overflow="hidden"
      marginX="auto"
      cursor="pointer"
      onMouseEnter={(): void => setShouldShowSecondary(true)}
      onMouseOut={(): void => setShouldShowSecondary(false)}
      onClick={onClick}
    >
      <Image
        display={shouldShowSecondary ? "none" : "inherit"}
        src={primaryImageUrl}
        alt={`${name} avatar looking away`}
        height="110px"
        width="110px"
        marginX="auto"
        marginTop={2}
        onMouseEnter={(): void => setShouldShowSecondary(true)}
      />
      <Image
        display={shouldShowSecondary ? "inherit" : "none"}
        src={secondaryImageUrl}
        alt={`${name} avatar looking dead in the eyes`}
        height="110px"
        width="110px"
        marginX="auto"
        marginTop={2}
      />
    </Flex>
  );
};

export default ProfileUserAvatar;
