export const Quizzes = Object.freeze({
  CountriesOfTheWorld: 1,
  CapitalsOfTheWorld: 2,
  USStates: 3,
  UKCounties: 4,
});

export const getVerb = (quiz) => {
  switch (quiz) {
    case Quizzes.CapitalsOfTheWorld:
      return "capitals";
    case Quizzes.USStates:
      return "states";
    case Quizzes.UKCounties:
      return "counties";
    default:
      return "countries";
  }
};

export const getTotal = (quiz) => {
  switch (quiz) {
    case Quizzes.CapitalsOfTheWorld:
      return 197;
    case Quizzes.USStates:
      return 51;
    case Quizzes.UKCounties:
      return 42;
    default:
      return 197;
  }
};

export const getTitle = (quiz) => {
  switch (quiz) {
    case Quizzes.CapitalsOfTheWorld:
      return "Capitals of the World Quiz";
    case Quizzes.USStates:
      return "US States Quiz";
    case Quizzes.UKCounties:
      return "UK Counties Quiz";
    default:
      return "Countries of the World Quiz";
  }
};
