import Head from "next/head";
import React from "react";

import MainView from "../components/MainView";
import RegisterContainer from "../containers/RegisterContainer";
import useQuizzes from "../hooks/UseQuizzes";

const Register = () => {
  const { quizzes, isLoading: isQuizzesLoading } = useQuizzes();

  if (isQuizzesLoading) {
    return null;
  }

  return (
    <MainView>
      <Head>
        <title>Register - GeoBuff</title>
      </Head>
      <RegisterContainer quizzes={quizzes} />
    </MainView>
  );
};

export default Register;
