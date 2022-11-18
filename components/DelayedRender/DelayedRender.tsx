import React, { FC, useEffect, useState } from "react";

import { Fade } from "@chakra-ui/react";

type Props = {
  waitBeforeShow?: number;
  shouldFadeIn?: boolean;
  children: React.ReactNode;
};

const DelayedRender: FC<Props> = ({
  children,
  waitBeforeShow = 500,
  shouldFadeIn = false,
}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  const mainContent = shouldFadeIn ? (
    <Fade in>{children}</Fade>
  ) : (
    <>{children}</>
  );

  return isShown ? mainContent : null;
};

export default DelayedRender;
