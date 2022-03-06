import { NullInt } from "./null-int";

export interface CheckoutPayload {
  items: CheckoutItem[];
  customer: CheckoutCustomer;
  shippingId: number;
  discountId: NullInt;
}

export interface CheckoutItem {
  id: number;
  sizeId: number;
  sizeName: string;
  quantity: number;
}

export interface CheckoutCustomer {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}
