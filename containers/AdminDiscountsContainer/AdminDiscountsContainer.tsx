import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminDiscounts from "../../components/AdminDiscounts";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const AdminDiscountsContainer: FC = () => {
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

  if (isLoading) {
    return null;
  }

  return <AdminDiscounts discounts={discounts} />;
};

export default AdminDiscountsContainer;
