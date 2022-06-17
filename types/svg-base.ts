import { SVGChild } from "./svg-child";

export interface SVGBase {
  label: string;
  viewBox: string;
  elements: SVGChild[];
}
