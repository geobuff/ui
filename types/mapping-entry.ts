export interface MappingEntry {
  id: number;
  groupId: number;
  name: string;
  code: string;
  flagUrl: string;
  svgName: string;
  alternativeNames: string[];
  prefixes: string[];
  grouping: string;
  checked?: boolean;
}
