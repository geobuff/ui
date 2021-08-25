import { Mapping } from "../types/mapping";

export const findSubmissionByNames = (
  collection: Array<Mapping>,
  submissionName: string
): Mapping =>
  collection?.find(
    ({ name, alternativeNames }) =>
      name.toLowerCase() === submissionName.toLowerCase() ||
      alternativeNames.includes(submissionName.toLowerCase())
  );

export const findSubmissionsByPrefixes = (
  collection: Array<Mapping>,
  submissionName: string
): Mapping =>
  collection?.find(({ prefixes }) =>
    prefixes.includes(submissionName.toLowerCase())
  );

export const findSubmissionByCode = (
  collection: Array<Mapping>,
  submissionCode: string
): Mapping => collection?.find(({ code }) => code === submissionCode);
