import { CheckoutFormSubmit } from "./checkout-form-submit";

export interface CheckoutPayload {
  items: CheckoutItem[];
  customer: CheckoutFormSubmit;
}

export interface CheckoutItem {
  id: number;
  size: string;
  quantity: number;
}
