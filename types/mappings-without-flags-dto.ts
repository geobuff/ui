import { FlagEntry } from "./flag-group";

export interface MappingsWithoutFlagsDto {
  key: string;
  entries: FlagEntry[];
}
