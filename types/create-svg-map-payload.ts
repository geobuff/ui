import { CreateEditQuizPayload } from "./create-edit-quiz-payload";
import { CreateMappingEntry } from "./create-mapping-entry";
import { SVGBase } from "./svg-base";

export interface CreateSvgMapPayload {
  svgMap: SVGBase;
  mappings: CreateMappingEntry[];
  quiz: CreateEditQuizPayload;
}
