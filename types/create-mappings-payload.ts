import { CreateMappingEntry } from "./create-mapping-entry";

export interface CreateMappingsPayload {
  key: string;
  label: string;
  entries: CreateMappingEntry[];
}
