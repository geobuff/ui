import React, { FC, useContext, useEffect } from "react";
import Head from "next/head";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useRouter } from "next/router";
import OrdersContainer from "../containers/OrdersContainer";

const Orders: FC = () => {
  const router = useRouter();
  const { user, isLoading } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <Head>
        <title>My Orders - GeoBuff</title>
      </Head>
      <MainView>
        <HeroHeader heading="My Orders" />
        <OrdersContainer email={user?.email} />
      </MainView>
    </>
  );
};

export default Orders;
