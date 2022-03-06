import { NullString } from "./null-string";

export interface Order {
  id: number;
  items: OrderItem[];
  statusId: number;
  status: string;
  shippingOption: string;
  discount: NullString;
  firstName: string;
  lastName: string;
  address: string;
  added: Date;
}

export interface OrderItem {
  itemName: string;
  sizeName: string;
  imageUrl: string;
  quantity: number;
}
