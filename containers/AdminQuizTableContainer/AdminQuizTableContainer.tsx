import { filter, Flex, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminQuizzes from "../../components/AdminQuizzes";
import DeleteQuizModal from "../../components/DeleteQuizModal";
import Modal from "../../components/Modal";
import { Quiz } from "../../types/quiz";
import { QuizEditValues } from "../../types/quiz-edit-values";
import { QuizPageDto } from "../../types/quiz-page-dto";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";
import AdminQuizFormContainer from "../AdminQuizFormContainer";

const AdminQuizTableContainer: FC = () => {
  const { data: session } = useSession();

  const [filterParams, setFilterParams] = useState<QuizzesFilterDto>({
    page: 0,
    limit: 10,
  });

  const [quizPage, setQuizPage] = useState<QuizPageDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [quizId, setQuizId] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizEditValues>(null);

  const {
    isOpen: isDeleteQuizModalOpen,
    onOpen: onDeleteQuizModalOpen,
    onClose: onDeleteQuizModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditQuizModalOpen,
    onOpen: onEditQuizModalOpen,
    onClose: onEditQuizModalClose,
  } = useDisclosure();

  useEffect(() => {
    setIsLoading(true);
    axiosClient.post(`/quizzes/all`, filterParams).then((response) => {
      setQuizPage(response.data);
      setIsLoading(false);
    });
  }, [filterParams]);

  const handleCreate = () => {
    setSelectedQuiz(null);
    onEditQuizModalOpen();
  };

  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz({
      id: quiz.id,
      typeId: quiz.typeId.toString(),
      badgeId: quiz.badgeId.Valid ? quiz.badgeId.Int64.toString() : "",
      continentId: quiz.continentId.Valid
        ? quiz.continentId.Int64.toString()
        : "",
      country: quiz.country || "",
      singular: quiz.singular,
      name: quiz.name,
      maxScore: quiz.maxScore.toString(),
      time: quiz.time.toString(),
      mapSVG: quiz.mapSVG || "",
      imageUrl: quiz.imageUrl,
      plural: quiz.plural,
      apiPath: quiz.apiPath,
      route: quiz.route,
      hasLeaderboard: quiz.hasLeaderboard.toString(),
      hasGrouping: quiz.hasGrouping.toString(),
      hasFlags: quiz.hasFlags.toString(),
      enabled: quiz.enabled.toString(),
    });

    onEditQuizModalOpen();
  };

  const handleDeleteQuiz = (quizId: number): void => {
    setError(false);
    setQuizId(quizId);
    onDeleteQuizModalOpen();
  };

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/quizzes/${quizId}`, session?.authConfig)
      .then(() => {
        setQuizPage({
          ...quizPage,
          quizzes: quizPage.quizzes.filter((x) => x.id !== quizId),
        });
        onDeleteQuizModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AdminQuizzes
        quizPage={quizPage}
        isLoading={isLoading}
        filterParams={filterParams}
        onChangeFilterParams={setFilterParams}
        onDelete={handleDeleteQuiz}
        onEdit={handleEdit}
        onCreate={handleCreate}
      />
      <DeleteQuizModal
        isOpen={isDeleteQuizModalOpen}
        onClose={onDeleteQuizModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
      <Modal
        isOpen={isEditQuizModalOpen}
        onClose={onEditQuizModalClose}
        maxHeight={{ base: "100%", md: "700px" }}
        minWidth="660px"
      >
        <Flex padding={10} width="100%" overflow="scroll">
          <AdminQuizFormContainer
            editValues={selectedQuiz}
            onClose={onEditQuizModalClose}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default AdminQuizTableContainer;
