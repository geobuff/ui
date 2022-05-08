import { NullFloat } from "./null-float";
import { NullString } from "./null-string";

export interface MerchItem {
  id: number;
  name: string;
  description: string;
  sizeGuideImageUrl: NullString;
  price: NullFloat;
  externalLink: NullString;
  route: string;
  sizes: MerchSize[];
  images: MerchImage[];
  soldOut: boolean;
}

export interface MerchSize {
  id: number;
  merchId: number;
  size: string;
  quantity: number;
}

export interface MerchImage {
  id: number;
  merchId: number;
  imageUrl: string;
  isPrimary: boolean;
}
