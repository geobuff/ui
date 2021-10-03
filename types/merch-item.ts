export interface MerchItem {
  id: number;
  name: string;
  description: string;
  price: number;
  disabled: boolean;
  sizes: MerchSize[];
  images: MerchImage[];
}

interface MerchSize {
  size: string;
  soldOut: boolean;
}

interface MerchImage {
  imageUrl: string;
  isPrimary: boolean;
}
