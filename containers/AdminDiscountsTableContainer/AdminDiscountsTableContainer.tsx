import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminDiscountsTable from "../../components/AdminDiscountsTable";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const AdminDiscountsTableContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/discounts", getAuthConfig())
      .then((response) => {
        setDiscounts(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  return <AdminDiscountsTable discounts={discounts} isLoading={isLoading} />;
};

export default AdminDiscountsTableContainer;
