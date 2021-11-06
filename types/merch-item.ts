import { NullFloat } from "./null-float";
import { NullString } from "./null-string";

export interface MerchItem {
  id: number;
  name: string;
  description: string;
  price: NullFloat;
  externalLink: NullString;
  sizes: MerchSize[];
  images: MerchImage[];
  soldOut: boolean;
}

interface MerchSize {
  id: number;
  merchId: number;
  size: string;
  quantity: number;
}

interface MerchImage {
  id: number;
  merchId: number;
  imageUrl: string;
  isPrimary: boolean;
}
