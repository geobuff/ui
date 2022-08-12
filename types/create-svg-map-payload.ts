import { CreateEditQuizPayload } from "./create-edit-quiz-payload";
import { CreateMappingsPayload } from "./create-mappings-payload";
import { SVGBase } from "./svg-base";

export interface CreateSvgMapPayload {
  svgMap: SVGBase;
  mappings: CreateMappingsPayload;
  quiz: CreateEditQuizPayload;
}
