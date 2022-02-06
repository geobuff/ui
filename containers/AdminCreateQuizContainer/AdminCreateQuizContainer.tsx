import React, { FC } from "react";
import AdminCreateQuizForm from "../../components/AdminCreateQuizForm";
import useBadges from "../../hooks/UseBadges";
import useContinents from "../../hooks/UseContinents";
import useQuizTypes from "../../hooks/UseQuizTypes";

const AdminCreateQuizContainer: FC = () => {
  const { data: types, isLoading: isQuizTypesLoading } = useQuizTypes();
  const { data: badges, isLoading: isBadgesLoading } = useBadges();
  const { data: continents, isLoading: isContinentsLoading } = useContinents();

  if (isQuizTypesLoading || isBadgesLoading || isContinentsLoading) {
    return null;
  }

  return (
    <AdminCreateQuizForm
      types={types}
      badges={badges}
      continents={continents}
    />
  );
};

export default AdminCreateQuizContainer;
