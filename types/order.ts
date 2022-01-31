import { NullString } from "./null-string";

export interface Order {
  id: number;
  items: OrderItem[];
  status: string;
  firstName: string;
  lastName: string;
  address: string;
  suburb: string;
  city: string;
  postcode: string;
  added: Date;
  discount: NullString;
}

export interface OrderItem {
  itemName: string;
  sizeName: string;
  imageUrl: string;
  quantity: number;
}
