import React, { FC, useContext, useEffect, useState } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import { useRouter } from "next/router";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import MerchSummaryContainer from "../../containers/MerchSummaryContainer";

const Summary: FC = () => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  const [route, setRoute] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const route = router.query.route as string;
      setRoute(route);
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <HeroHeader heading={t.global.merch} />
      {isLoading ? null : <MerchSummaryContainer route={route} />}
    </>
  );
};

export default Summary;
