import { FlagEntry } from "./flag-group";

export interface FlagsFormSubmit {
  key: string;
  label: string;
  entries: FlagEntry[];
}
