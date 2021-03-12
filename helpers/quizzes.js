import {
  WorldCountries,
  WorldCapitals,
  USStates,
  UKCounties,
} from "@geobuff/maps";

export const Quizzes = Object.freeze({
  CountriesOfTheWorld: 1,
  CapitalsOfTheWorld: 2,
  USStates: 3,
  UKCounties: 4,
});

export const getIdByRoute = (route) => {
  switch (route) {
    case "countries-of-the-world":
      return Quizzes.CountriesOfTheWorld;
    case "capitals-of-the-world":
      return Quizzes.CapitalsOfTheWorld;
    case "us-states":
      return Quizzes.USStates;
    case "uk-counties":
      return Quizzes.UKCounties;
    default:
      return null;
  }
};

export const getMapById = (id) => {
  switch (id) {
    case Quizzes.CountriesOfTheWorld:
      return WorldCountries;
    case Quizzes.CapitalsOfTheWorld:
      return WorldCapitals;
    case Quizzes.USStates:
      return USStates;
    case Quizzes.UKCounties:
      return UKCounties;
    default:
      return null;
  }
};
