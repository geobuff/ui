import { Trivia } from "./trivia";

export interface FilteredTrivia extends Trivia {
  isActive: boolean;
}
