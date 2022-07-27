import React, { FC } from "react";
import LandingPage from "../../components/LandingPage/LandingPage";
import { LandingPageRow } from "../../types/landing-page-row";

const rows: LandingPageRow[] = [
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/quiz-builder.png`,
    imageAlt: "Quiz builder example",
    explainer:
      "Use our quiz builder to create the perfect brain scratcher for your friends, students or workmates!",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/resources.png`,
    imageAlt: "Resources example",
    explainer:
      "Utilise our extensive collection of map or flag resources to fine tune each question.",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/visibility.png`,
    imageAlt: "Public/private toggle example",
    explainer:
      "Make your quiz public to see how our community of GeoBuff's fare or keep it private to share with your friends.",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/my-quizzes.png`,
    imageAlt: "My quizzes example",
    explainer:
      "View, edit or delete your quizzes and check the quiz plays in your user profile!",
  },
];

const CreateCommunityQuizzes: FC = () => (
  <LandingPage
    title="Create Community Quizzes"
    description="Think you've got what it takes to go head-to-head with our community of GeoBuff's? Test your knowledge with our collection of user generated quizzes!"
    rows={rows}
    question="Heard enough?"
    actionText="Sign up today to start creating your own!"
    actionHref="/register"
  />
);

export default CreateCommunityQuizzes;
