import React, { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import MerchSummaryContainer from "../../containers/MerchSummaryContainer";
import MainView from "../../components/MainView";
import HeroHeader from "../../components/HeroHeader";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

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
    <MainView>
      <HeroHeader heading={t.global.merch} />
      {isLoading ? null : <MerchSummaryContainer route={route} />}
    </MainView>
  );
};

export default Summary;
