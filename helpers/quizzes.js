export const Quizzes = Object.freeze({
  CountriesOfTheWorld: 1,
  CapitalsOfTheWorld: 2,
  USStates: 3,
  UKCounties: 4,
});

export const getVerb = (quiz) => {
  switch (quiz) {
    case Quizzes.CountriesOfTheWorld:
      return "countries";
    case Quizzes.CapitalsOfTheWorld:
      return "capitals";
    case Quizzes.USStates:
      return "states";
    case Quizzes.UKCounties:
      return "counties";
    default:
      throw Error("Invalid quiz option.");
  }
};

export const getTotal = (quiz) => {
  switch (quiz) {
    case Quizzes.CountriesOfTheWorld:
      return 197;
    case Quizzes.CapitalsOfTheWorld:
      return 197;
    case Quizzes.USStates:
      return 51;
    case Quizzes.UKCounties:
      return 42;
    default:
      throw Error("Invalid quiz option.");
  }
};

export const getTitle = (quiz) => {
  switch (quiz) {
    case Quizzes.CountriesOfTheWorld:
      return "Countries of the World Quiz";
    case Quizzes.CapitalsOfTheWorld:
      return "Capitals of the World Quiz";
    case Quizzes.USStates:
      return "US States Quiz";
    case Quizzes.UKCounties:
      return "UK Counties Quiz";
    default:
      throw Error("Invalid quiz option.");
  }
};

export const getApiPath = (quiz) => {
  switch (quiz) {
    case Quizzes.CountriesOfTheWorld:
      return "countries";
    case Quizzes.CapitalsOfTheWorld:
      return "capitals";
    default:
      throw Error("Invalid quiz option.");
  }
};

export const getImageUrl = (quiz) => {
  switch (quiz) {
    case Quizzes.CountriesOfTheWorld:
      return "/world-map-header.svg";
    case Quizzes.CapitalsOfTheWorld:
      return "/world-map-header.svg";
    case Quizzes.USStates:
      return "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1fa-1f1f8.svg";
    case Quizzes.UKCounties:
      return "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1ec-1f1e7.svg";
    default:
      throw Error("Invalid quiz option.");
  }
};

export const isScoreOnly = (quiz) => {
  switch (quiz) {
    case Quizzes.UKCounties:
    case Quizzes.USStates:
      return true;
    default:
      return false;
  }
};
