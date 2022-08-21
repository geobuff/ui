import { ManualTriviaQuestionPayload } from "./manual-trivia-payload";

export interface BulkUploadValues {
  typeId: string;
  name: string;
  description: string;
  isPublic: string;
  isVerified: string;
  questions: ManualTriviaQuestionPayload[];
}
