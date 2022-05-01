import { MerchItem } from "../types/merch-item";
import { NullFloat } from "../types/null-float";

export interface FlattenedMerchSize {
  name: string;
  price: NullFloat;
  size: string;
  quantity: number;
}

export const flattenToSizes = (items: MerchItem[]): FlattenedMerchSize[] => {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    for (let j = 0; j < item.sizes?.length; j++) {
      const size = item.sizes[j];
      result.push({
        name: item.name,
        price: item.price,
        size: size.size,
        quantity: size.quantity,
      });
    }
  }

  return result;
};
