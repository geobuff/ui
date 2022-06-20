import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminDiscountsTable from "../../components/AdminDiscountsTable";
import { AuthUser } from "../../types/auth-user";

const AdminDiscountsTableContainer: FC = () => {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  const user = session?.user as AuthUser;

  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSessionLoading) {
      axiosClient
        .get("/discounts", user?.authConfig)
        .then((response) => {
          setDiscounts(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isSessionLoading, user]);

  return <AdminDiscountsTable discounts={discounts} isLoading={isLoading} />;
};

export default AdminDiscountsTableContainer;
