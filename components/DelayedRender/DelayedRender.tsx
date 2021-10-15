import { Fade } from "@chakra-ui/react";
import React, { FC, useState, useEffect } from "react";

type Props = {
  waitBeforeShow?: number;
  shouldFadeIn?: boolean;
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
