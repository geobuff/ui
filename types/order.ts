import { NullString } from "./null-string";

export interface Order {
  id: number;
  items: OrderItem[];
  statusId: number;
  status: string;
  firstName: string;
  lastName: string;
  address: string;
  added: Date;
  discount: NullString;
}

export interface OrderItem {
  itemName: string;
  sizeName: string;
  imageUrl: string;
  quantity: number;
}
