import { SVGBase } from "@geobuff/buff-ui/components";

import { CreateEditQuizPayload } from "./create-edit-quiz-payload";
import { CreateMappingsPayload } from "./create-mappings-payload";

export interface CreateSvgMapPayload {
  svgMap: SVGBase;
  mappings: CreateMappingsPayload;
  quiz: CreateEditQuizPayload;
}
