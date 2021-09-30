import { SVGPath } from "./svg-path";

export interface SVGBase {
  label: string;
  viewBox: string;
  paths: SVGPath[];
}
