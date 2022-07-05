const requiredHeaders = [
  "Question",
  "Explainer",
  "Type",
  "Category",
  "Resource",
  "ImageAttributeName",
  "ImageAttributeUrl",
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
