import { SVGElement } from "./svg-element";

export interface SVGBase {
  id: number;
  key: string;
  className: string;
  label: string;
  viewBox: string;
  elements: SVGElement[];
}
