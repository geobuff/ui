const requiredHeaders = [
  "Question",
  "Explainer",
  "Type",
  "Category",
  "Resource",
  "Highlighted",
  "Answers",
  "Correct",
  "Source",
];

export const validateBulkUploadCsvHeaders = (data: any): string => {
  for (const key in data) {
    if (!requiredHeaders.includes(key)) {
      return `Invalid CSV format. ${key} header is invalid.`;
    }
  }
  return "";
};
