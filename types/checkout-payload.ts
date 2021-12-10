import { CheckoutFormSubmit } from "./checkout-form-submit";

export interface CheckoutPayload {
  items: CheckoutItem[];
  customer: CheckoutFormSubmit;
}

export interface CheckoutItem {
  id: number;
  sizeId: number;
  sizeName: string;
  quantity: number;
}
