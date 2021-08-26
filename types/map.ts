import { SVGLocation } from "./svg-location";

export interface Map {
  label: string;
  viewBox: string;
  locations: Array<SVGLocation>;
}
