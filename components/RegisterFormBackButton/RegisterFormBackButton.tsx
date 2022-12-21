import React, { FC } from "react";

import { ArrowLeft } from "@geobuff/buff-ui/components";

import { Button, ButtonProps } from "@chakra-ui/react";

export const RegisterFormBackButton: FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      leftIcon={<ArrowLeft height={5} width={5} />}
      // Bleed the margins to add nicer hover effect
      // without messing with parent margins
      marginLeft={-3}
      marginTop={-3}
      paddingX={3}
      fontWeight="bold"
      {...props}
    >
      {children}
    </Button>
  );
};
