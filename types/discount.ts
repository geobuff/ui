import { NullInt } from "./null-int";

export interface Discount {
  id: number;
  merchId: NullInt;
  code: string;
  amount: number;
}
