export interface EditMappingGroupSubmit {
  label: string;
  entries: EditMappingEntrySubmit[];
}

export interface EditMappingEntrySubmit {
  id: number;
  name: string;
  code: string;
  svgName: string;
  alternativeNames: string;
  prefixes: string;
  grouping?: string;
}

export interface EditMappingGroupPayload {
  label: string;
  entries: EditMappingEntryPayload[];
}

export interface EditMappingEntryPayload {
  id: number;
  name: string;
  code: string;
  svgName: string;
  alternativeNames: string[];
  prefixes: string[];
  grouping?: string;
}
