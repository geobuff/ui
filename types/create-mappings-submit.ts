import { CreateMappingEntry } from "./create-mapping-entry";

export interface CreateMappingsSubmit {
  groupName: string;
  entries: CreateMappingEntry[];
}
