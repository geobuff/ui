export interface FlagGroup {
  key: string;
  label: string;
  entries: FlagEntry[];
}

export interface FlagEntry {
  code: string;
  url: string;
}
