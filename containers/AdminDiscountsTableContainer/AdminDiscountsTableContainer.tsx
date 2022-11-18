import React, { FC, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import AdminDiscountsTable from "../../components/AdminDiscountsTable";

import axiosClient from "../../axios";

const AdminDiscountsTableContainer: FC = () => {
  const { data: session, status } = useSession();

  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      axiosClient
        .get("/discounts", session?.authConfig)
        .then((response) => {
          setDiscounts(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status, session]);

  return <AdminDiscountsTable discounts={discounts} isLoading={isLoading} />;
};

export default AdminDiscountsTableContainer;
