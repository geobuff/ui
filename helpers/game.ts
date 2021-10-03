import { Mapping } from "../types/mapping";

export const findSubmissionByNames = (
  collection: Mapping[],
  submissionName: string
): Mapping =>
  collection?.find(
    ({ name, alternativeNames }) =>
      name.toLowerCase() === submissionName.toLowerCase() ||
      alternativeNames.includes(submissionName.toLowerCase())
  );

export const findSubmissionsByPrefixes = (
  collection: Mapping[],
  submissionName: string
): Mapping[] =>
  collection.filter((submission) =>
    submission.prefixes.includes(submissionName.toLowerCase())
  );

export const findSubmissionByCode = (
  collection: Mapping[],
  submissionCode: string
): Mapping => collection?.find(({ code }) => code === submissionCode);
