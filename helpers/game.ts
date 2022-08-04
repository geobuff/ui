import { MappingEntry } from "../types/mapping-entry";

export const findSubmissionByNames = (
  collection: MappingEntry[],
  submissionName: string
): MappingEntry =>
  collection?.find(
    ({ name, alternativeNames }) =>
      name.toLowerCase() === submissionName.toLowerCase() ||
      alternativeNames.includes(submissionName.toLowerCase())
  );

export const findSubmissionsByPrefixes = (
  collection: MappingEntry[],
  submissionName: string
): MappingEntry[] =>
  collection.filter((submission) =>
    submission.prefixes.includes(submissionName.toLowerCase())
  );

export const findSubmissionByCode = (
  collection: MappingEntry[],
  submissionCode: string
): MappingEntry => collection?.find(({ code }) => code === submissionCode);
