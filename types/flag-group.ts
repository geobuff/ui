export interface FlagGroup {
  id: number;
  key: string;
  label: string;
}

export interface FlagEntry {
  id: number;
  groupId: number;
  code: string;
  url: string;
}
