export interface MappingEntry {
  id: number;
  groupId: number;
  name: string;
  code: string;
  svgName: string;
  alternativeNames: string[];
  prefixes: string[];
  grouping: string;
  checked?: boolean;
}
